export type RuleForValue = { message?: string } & (
  | { required: boolean }
  | { format: FormatOptions }
  | { length: LengthOptions }
  );

type FormatOptions = 'china phone' | 'email' | 'number' | 'float' | RegExp
type LengthOptions = (number | undefined)[]


export type RulesForFormData<T> = {
  [K in keyof T]?: (RuleForValue)[]
}

interface FormData {
  [K: string]: unknown;
}

interface ValidatorOptions<O = any> {
  params: O;
  value: string;
  key: string;
  message?: string;
  formData: FormData;
  callback: (error?: string) => void
}

interface Validator<O = any> {
  (options: ValidatorOptions<O>): void
}

const translation = {
  required: '必填',
  format: '格式不正确',
  length: '长度不符合要求'
};

const required: Validator = ({message, value, callback}) => {
  if (value === undefined || value === null || value === '') {
    callback(message ?? translation['required']);
  } else {
    callback();
  }
};
const length: Validator = ({params, message, value, callback}) => {
  const string = value.toString();
  let [min, max] = params;
  min = min ?? -Infinity;
  max = max ?? Infinity;
  if (string.length > max || string.length < min) {
    callback(message ?? translation['length']);
  } else {
    callback();
  }
};

const format: Validator = ({params, message, value, callback}) => {
  const string = value.toString();
  const pattern = params instanceof RegExp ? params :
    params === 'china phone' ? /1[\d]{10}/ :
      params === 'email' ? /.+@.+/ :
        params === 'number' ? /\d+/ :
          params === 'float' ? /\d+(.\d+)?/ :
            undefined as never;
  if (pattern.test(string)) {
    callback();
  } else {
    callback(message ?? translation['format']);
  }
};

const builtinValidators = {
  required, length, format
};

type BuiltinRuleName = keyof typeof builtinValidators

const isBuiltinRuleName = (ruleName: string): ruleName is BuiltinRuleName => {
  return Object.keys(builtinValidators).includes(ruleName);
};

const validate = <T extends FormData>(formData: T, rules: RulesForFormData<T>) => {
  // 旧浏览器可能不支持 Object.entries
  const errors = Object.keys(formData).map(key => {
    const value = formData[key];
    const rulesForValue = rules[key];
    if (!rulesForValue) {return [];}
    return rulesForValue.map(rule => {
      const message = rule.message;
      delete rule.message;
      const [ruleName, params] = Object.entries(rule)[0];
      return new Promise<[keyof T, string | undefined]>((resolve) => {
        if (isBuiltinRuleName(ruleName)) {
          builtinValidators[ruleName]({
            params, key, formData, message,
            value: value as string,
            callback: error => resolve([key, error])
          });
        }
      });
    });
  }).flat(1);
  return Promise.all(errors).then((values) => {
    return values.reduce((object, [key, value]) => {
      if (value === undefined) {return object;}
      if (!(key in object)) {
        object[key] = [value];
      } else {
        object[key]!.push(value);
      }
      return object;
    }, {} as { [K in keyof T]?: (string)[] });
  }).then(values => Object.keys(values).length === 0 ? null : values);
};

export {validate};

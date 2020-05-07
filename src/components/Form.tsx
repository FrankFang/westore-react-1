import styled from 'styled-components';
import React, {InputHTMLAttributes, PropsWithChildren, useState, Fragment} from 'react';
import {Input} from './Input';
import {RuleForValue, RulesForFormData, validate} from '../lib/validate';
import {InputError} from './InputError';

export const Form = styled.form`
  padding: 16px;
  background: white;
  > h1{
    font-size: 18px;
    margin-bottom: 8px;
    &:empty{display:none;}
  }
  > .fields{ }
  > footer{
    margin-bottom: 32px;
  }
`;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'> {
  label?: string;
}

interface Transform {
  in: (string: string) => string | number,
  out: (value: string | number) => string
}

type Props<T = any> = (
  | { data: T; onChange: (data: T) => void; }
  | { defaultData: T; })
  & {
  title?: string;
  fields: {
    key: keyof T;
    input: InputProps;
    rules?: RuleForValue[];
    transform?: Transform;
  }[];
  onSubmit?: (data: T) => void;
}

export function F<T extends { [K: string]: any }>(props: PropsWithChildren<Props<T>>) {
  const [_data, _setData] = useState<T | null>('defaultData' in props ? props.defaultData : null);
  const [errors, setErrors] = useState<ErrorsFor<T> | null>(null);
  const getData = () => 'defaultData' in props ? _data : props.data;
  const patchData = (key: keyof T, v: string, transform?: Transform) => {
    const fn = 'defaultData' in props ? _setData : props.onChange;
    const item = transform ? transform.in(v) : v;
    const value = {...getData(), [key]: item} as T;
    fn(value);
  };
  const getRules = () => {
    return props.fields.reduce((object, field) => ({...object, [field.key]: field.rules}),
      {} as RulesForFormData<T>);
  };
  const getValue = (key: keyof T, transform?: Transform) => {
    const data = getData();
    if (transform && data && data[key] !== undefined) {
      return transform.out(data[key]) ?? '';
    } else {
      return data?.[key] ?? '';
    }
  };

  const submit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const data = getData()!;
    const rules = getRules();
    const errors = await validate(data, rules);
    setErrors(errors);
    if (!errors) {
      props.onSubmit?.(data);
    }
  };

  return (
    <Form onSubmit={submit}>
      <h1>{props.title}</h1>
      <div className="fields">
        {props.fields.map(field =>
          <Fragment key={field.key.toString()}>
            <FormRow>
              <Input {...field.input} value={getValue(field.key, field.transform)}
                onChange={e => {
                  patchData(field.key, e.target.value, field.transform);
                }}/>
            </FormRow>
            {errors?.[field.key] &&
            <FormRow>
              <InputError value={errors[field.key]?.[0]}/>
            </FormRow>
            }
          </Fragment>
        )}
      </div>
      {props.children &&
      <footer>
        {props.children}
      </footer>}
    </Form>
  );
}

export const FormRow = styled.div`
  display:flex;
  & + & {margin-top: 8px;}
  > * + * { margin-left: 8px; }
  &:empty{ display:block; }
`;



import styled from 'styled-components';
import React, {InputHTMLAttributes, PropsWithChildren, useState} from 'react';
import {Input} from './Input';
import {RuleForValue} from '../lib/validate';

export const Form = styled.form`
  padding: 16px;
  background: white;
  > h1{
    font-size: 18px;
    margin-bottom: 8px;
    &:empty{display:none;}
  }
  > .fields{
    margin-bottom: 32px;
  }
`;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'> {
}

type Props<T = any> = (
  | { data: T; onChange: (data: T) => void; }
  | { defaultData: T; })
  & {
  title?: string;
  fields: { key: keyof T; input: InputProps; rules?: RuleForValue[] }[];
  onSubmit?: (data: T) => void;
}

export function F<T extends { [K: string]: any }>(props: PropsWithChildren<Props<T>>) {
  const [_data, _setData] = useState<T | null>('defaultData' in props ? props.defaultData : null);
  const getData = () => 'defaultData' in props ? _data : props.data;
  const patchData = (key: keyof T, v: string) => {
    const fn = 'defaultData' in props ? _setData : props.onChange;
    const value = {...getData(), [key]: v} as T;
    fn(value);
  };

  return (
    <Form onSubmit={() => props.onSubmit?.(getData()!)}>
      <h1>{props.title}</h1>
      <div className="fields">
        {props.fields.map(field =>
          <FormRow key={field.key.toString()}>
            <Input {...field.input} value={getData()?.[field.key]}
              onChange={e => {
                patchData(field.key, e.target.value);
              }}/>
          </FormRow>
        )}
      </div>
      {props.children}
    </Form>
  );
}
export const FormRow = styled.div`
  display:flex;
  & + & {margin-top: 8px;}
  > * + * { margin-left: 8px; }
  &:empty{ display:block; }
`;



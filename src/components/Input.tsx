import React from 'react';
import styled from 'styled-components';
import vars from '_vars.scss';

const Label = styled.label`
  display:inline-flex;
  flex-grow: 1;
`;
const StyledInput = styled.input`
  border: none;
  background:#eeeeee;
  border-radius: 4px;
  height: 40px;
  flex-grow: 1;
  padding: 0 8px;
`;
const Span = styled.span`
  line-height: 40px;
  padding: 0 8px;
  background: #eeeeee;
  border-top-left-radius: ${vars.borderRadius};
  border-bottom-left-radius: ${vars.borderRadius};
  + input{
    border-top-left-radius:0;
    border-bottom-left-radius:0;
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = (props) => {
  const {children, label, ...rest} = props;
  return (
    <Label>
      {label && <Span>{label}</Span>}
      <StyledInput type="text" {...rest}/>
    </Label>
  );
};

export {Input};

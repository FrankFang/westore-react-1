import React from 'react';
import styled from 'styled-components';

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

interface Props extends React.InputHTMLAttributes<InnerHTML> {

}

const Input: React.FC<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <Label>
      <StyledInput type="text" {...rest}/>
    </Label>
  );
};

export {Input};

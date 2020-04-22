import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const FlatButton = styled.button`
  line-height: 20px; 
  padding: 10px 16px;
  background: none;
  border: none;
  background: #eee;
`;

const Button: React.FC<Props> = ({children, ...rest}) => {
  return (
    <FlatButton {...rest}>{children}</FlatButton>
  );
};

export {Button};

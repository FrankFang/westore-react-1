import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  children: string | number;
}

const Unit = styled.span`
  font-size: 0.8em;
`;

const toHuman = (number: number) => {
  if (Number.isNaN(number)) {
    return '无效';
  } else {
    return <><Unit>￥</Unit>{(number / 100).toFixed(2)
      .replace(/\.00$/g, '')}</>;
  }
};
export const Money: React.FC<Props> = (props) => {
  const {children, ...rest} = props;
  const number = parseInt(children.toString());
  if (Number.isNaN(number)) {
    console?.error?.(`${children} is not a number`);
  }
  return (
    <span {...rest}>{toHuman(number)}</span>
  );
};


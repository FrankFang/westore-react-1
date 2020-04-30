import React from 'react';

interface Props {
  children: string | number;
}

const toHuman = (number: number) => {
  if (Number.isNaN(number)) {
    return '无效';
  } else {
    return '￥' + (number / 100).toFixed(2).replace(/\.00$/g, '');
  }
};
export const Money: React.FC<Props> = (props) => {
  const number = parseInt(props.children.toString());
  if (Number.isNaN(number)) {
    console?.error?.(`${props.children} is not a number`);
  }
  return (
    <span>{toHuman(number)}</span>
  );
};


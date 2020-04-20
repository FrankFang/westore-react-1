import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 24px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  line-height: 36px;
  padding: 10px 16px;
  background:white;
  border-bottom: 1px solid #ccc;
`;
export type TopbarProps = {
  title: string;
}
const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    <Wrapper>
      <Icon name="left"/>
      <span>{props.title}</span>
      <Icon/>
    </Wrapper>
  );
};

export {Topbar};

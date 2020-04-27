import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import vars from '_vars.scss';

const Wrapper = styled.div`
  font-size: 24px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background:white;
  border-bottom: 1px solid ${vars.colorBorder};
  height: ${vars.heightHeader};
`;
export interface TopbarProps {
  title: string;
  action?: React.ReactNode
}
const Placeholder = styled.div`
  width: 24px;
  height: 24px;
`;
const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    <Wrapper>
      <Icon name="left"/>
      <span>{props.title}</span>
      <Placeholder>
        {props.action}
      </Placeholder>
    </Wrapper>
  );
};

export {Topbar};

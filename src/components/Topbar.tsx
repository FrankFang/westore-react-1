import React from 'react';
import Icon from './Icon';
import styled from 'styled-components';
import vars from '_vars.scss';
import {history} from '../lib/history';

const Wrapper = styled.div`
  font-size: 24px;
  display:flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background:white;
  border-bottom: 1px solid ${vars.colorBorder};
  height: ${vars.heightHeader};
  position:relative;
`;

export interface TopbarProps {
  title: string;
  action?: React.ReactNode;
  hasBack?: boolean;
}

const Placeholder = styled.div`
  width: 24px;
  height: 24px;
  text-align:right;
`;
const goBack = () => {
  history.goBack();
};
const Action = styled.div`
  position:absolute;
  right:16px; 
  top: 50%;
  display:flex;
  align-items: center;
  transform: translateY(-50%);
`;
const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    <Wrapper>
      {props.hasBack ?
        <Icon name="left" onClick={goBack}/>
        :
        <Icon/>
      }
      <span>{props.title}</span>
      <Placeholder/>
      <Action>
        {props.action}
      </Action>
    </Wrapper>
  );
};
Topbar.defaultProps = {
  hasBack: true
}

export {Topbar};

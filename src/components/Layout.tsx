import React from 'react';
import styled from 'styled-components';
import {Topbar, TopbarProps} from './Topbar';

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

interface Props extends TopbarProps {

}

const Layout: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Topbar title={props.title} action={props.action}/>
      <Main>
        {props.children}
      </Main>
    </Wrapper>
  );
};

export default Layout;

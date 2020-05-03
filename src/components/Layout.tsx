import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Topbar, TopbarProps} from './Topbar';


interface Props extends TopbarProps {
  footer?: ReactNode;
}

const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
`;
const Footer = styled.footer`
  flex-grow: 0;  
  margin-top: auto;
`;

const Layout: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Topbar title={props.title} action={props.action} hasBack={props.hasBack}/>
      <Main>
        {props.children}
      </Main>
      <Footer>
        {props.footer}
      </Footer>
    </Wrapper>
  );
};


export default Layout;

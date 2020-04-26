import styled from 'styled-components';
import Icon from '../components/Icon';
import vars from '_vars.scss';

export const Logo = styled(Icon)`
  width: 100px;
  height: 100px;
`;
export const Header = styled.header`
  padding-top: 100px; 
  text-align:center;
  margin-bottom: 16px;
  .icon {
    fill: ${vars.colorMain};
  }
  h1{margin-top: 0; font-size: 20px;}
`;
export const Main = styled.div`

`;
export const Wrapper = styled.div`
  background:white;
  min-height: 100vh;
`;


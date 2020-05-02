import styled from 'styled-components';
import vars from '_vars.scss';

export const Panel = styled.div`
  padding: 16px;
  margin: 16px 0;
  background: white;
  > h1, > h2, > h3, >h4, >h5, > h6 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  > footer{
    border-top: 1px solid ${vars.colorBorder};
    padding-top: 16px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
`;

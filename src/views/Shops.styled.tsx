import styled from 'styled-components';
import vars from '_vars.scss';

export const ListPanel = styled.div`
   font-size: 24px; 
  > h1{
    display:flex; justify-content: space-between; align-items: center; height:${vars.heightHeader};
    padding: 0 16px; border-bottom: 1px solid ${vars.colorBorder}; border-top: 1px solid ${vars.colorBorder};
  }
  > ol {
    background: white; border-bottom: 1px solid ${vars.colorBorder};
    > li{
    }
  }
`;

export const Item = styled.div`
  > a{
    display:flex; 
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: ${vars.heightItem};
  }
  .name{
    margin-right: auto;
    margin-left: 8px;
  }
  img{
    width: 24px;
    height: 24px;
  } 
`;

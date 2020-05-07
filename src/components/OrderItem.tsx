import styled from 'styled-components';
import vars from "_vars.scss";

export const OrderItem = styled.div`
  margin-bottom: 16px;
  display:flex;
  > .cover{
    width: 80px; border: 1px solid ${vars.colorBorder}; border-radius: ${vars.borderRadius};
    margin-right: 16px;
  } 
  > .text{
    display:flex; 
    flex-direction: column;
    justify-content: space-between;
    position:relative;
    flex-grow: 1;
  }
  .money{
    font-size: 18px; color: ${vars.colorDanger};
  }
`;

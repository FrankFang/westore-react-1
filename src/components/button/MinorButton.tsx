import styled from 'styled-components';
import vars from '_vars.scss';
import {UnstyledButton} from './UnstyledButton';

const MinorButton = styled(UnstyledButton)`
  white-space: nowrap;
  height: 40px;
  border: 1px solid ${vars.colorMain};
  padding: 0 16px;
  border-radius: ${vars.borderRadius};
  flex-grow: 1;
  background: transparent;
  color: ${vars.colorMain};
  font-size: 18px;
  position:relative;
  &[disabled]{
    border-color:#999;
    color: #999;
  }
  > .badge{
    position:absolute; 
    bottom: 100%;
    left: 100%;
    font-size: 12px;
    background: ${vars.colorDanger};
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    display:inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    transform: translate(-50%,50%);
  }
`;

export {MinorButton};

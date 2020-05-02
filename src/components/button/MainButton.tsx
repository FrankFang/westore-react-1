import styled from 'styled-components';
import vars from '_vars.scss';
import {UnstyledButton} from './UnstyledButton';

const MainButton = styled(UnstyledButton)`
  white-space: nowrap;
  height: 40px;
  border: none;
  padding: 0 16px;
  border-radius: ${vars.borderRadius};
  flex-grow: 1;
  background: ${vars.colorMain};
  color: white;
  font-size: 18px;
  position:relative;
  &[disabled]{
    background:#999;
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

export {MainButton};

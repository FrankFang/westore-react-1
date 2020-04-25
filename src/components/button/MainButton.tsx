import styled from 'styled-components';
import vars from '_vars.scss';
import {UnstyledButton} from './UnstyledButton';

const MainButton = styled(UnstyledButton)`
  height: 40px;
  border: none;
  padding: 0 16px;
  border-radius: ${vars.borderRadius};
  flex-grow: 1;
  background: ${vars.colorMain};
  color: white;
  &[disabled]{
    background:#999;
  }
`;

export {MainButton};

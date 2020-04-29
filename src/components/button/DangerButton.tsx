import styled from 'styled-components';
import vars from '_vars.scss';
import {UnstyledButton} from './UnstyledButton';

const DangerButton = styled(UnstyledButton)`
  white-space: nowrap;
  height: 40px;
  border: none;
  padding: 0 16px;
  border-radius: ${vars.borderRadius};
  flex-grow: 1;
  background: ${vars.colorDanger};
  color: white;
  font-size: 18px;
  &[disabled]{
    background:#999;
  }
`;

export {DangerButton};

import styled from 'styled-components';
import vars from '_vars.scss';
import {UnstyledButton} from './UnstyledButton';

const MinorButton = styled(UnstyledButton)`
  height: 40px;
  border: 1px solid ${vars.colorMain};
  padding: 0 16px;
  border-radius: ${vars.borderRadius};
  flex-grow: 1;
  background: transparent;
  color: ${vars.colorMain};
  &[disabled]{
    border-color:#999;
    color: #999;
  }
`;

export {MinorButton};

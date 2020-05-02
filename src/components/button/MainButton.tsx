import styled from 'styled-components';
import vars from '_vars.scss';
import {SizedButton} from './SizedButton';

const MainButton = styled(SizedButton)`
  border: none;
  border-radius: ${vars.borderRadius};
  background: ${vars.colorMain};
  color: white;
  &[disabled]{
    background:#999;
  }
`;

export {MainButton};

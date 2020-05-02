import styled from 'styled-components';
import vars from '_vars.scss';
import {SizedButton} from './SizedButton';

const MinorButton = styled(SizedButton)`
  border: 1px solid ${vars.colorMain};
  border-radius: ${vars.borderRadius};
  background: transparent;
  color: ${vars.colorMain};
  position:relative;
  &[disabled]{
    border-color:#999;
    color: #999;
  }
`;

export {MinorButton};

import React from 'react';
import styled from 'styled-components';
import vars from '_vars.scss';

type Props = {
  value?: string
}
const Wrapper = styled.div`
  font-size: 12px;
  padding: 0 8px;
  color: ${vars.colorDanger}
`;
const InputError: React.FC<Props> = (props) => {
  return props.value ?
    <Wrapper>
      {props.value}
    </Wrapper>
    : null;
};

export {InputError};

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align:center;
  padding: 16px;
  flex-grow: 1;
`
const Loading: React.FC = () => {
  return (
    <Wrapper>加载中...</Wrapper>
  );
};

export {Loading};

import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Wrapper} from './Shop.Wrapper';

const _Shop: React.FC<RouteComponentProps<{ id: string }>> = () => {
  return (
    <Wrapper>
      hi
    </Wrapper>
  );
};

export const Shop = withRouter(_Shop);

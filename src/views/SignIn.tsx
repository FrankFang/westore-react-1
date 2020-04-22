import React from 'react';
import {Button} from 'antd';
import {history, pathnameBeforeSignIn} from '../lib/history';

export const SignIn: React.FC = () => {
  return (
    <div>sign in
      <Button onClick={() => {
        history.push(pathnameBeforeSignIn.value || '/');
      }}>
        back
      </Button>
    </div>
  );
};



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'index.scss';
import 'initializers/index';
import {mutate, cache} from 'swr';

(window as any).swrMutate = mutate;
(window as any).swrCache = cache;

ReactDOM.render(<App/>,
  document.getElementById('root')
);


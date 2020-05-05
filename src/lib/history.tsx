import {createHashHistory} from 'history';

export const history = createHashHistory();

let _pathnameBeforeSignIn = window.localStorage.getItem('pathnameBeforeSignIn') || '';
export const pathnameBeforeSignIn = Object.defineProperty({
  value: ''
}, 'value', {
  get() {
    return _pathnameBeforeSignIn;
  },
  set(v: string) {
    _pathnameBeforeSignIn = v;
    window.localStorage.setItem('pathnameBeforeSignIn', v);
  }
});


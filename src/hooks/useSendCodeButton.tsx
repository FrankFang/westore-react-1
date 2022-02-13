import {MinorButton} from '../components/button/MinorButton';
import React, {useEffect, useRef, useState} from 'react';

const useSendCodeButton = (sendCode: React.MouseEventHandler<HTMLButtonElement>) => {

  const [countDown, setCountDown] = useState(10);
  const timer = useRef<number | null>(null);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (codeSent) {
      setCountDown(10);
      timer.current = window.setInterval(() => {
        setCountDown(x => x - 1);
      }, 1000);
      return () => {
        window.clearInterval(timer.current!);
      };
    }
  }, [codeSent]);
  useEffect(() => {
    if (countDown <= 0) {
      window.clearInterval(timer.current!);
      setCodeSent(false);
    }
  }, [countDown]);
  const sendCodeButton = codeSent
    ? <MinorButton disabled>{countDown} 秒后可重试</MinorButton>
    : <MinorButton onClick={sendCode}>发送验证码</MinorButton>;


  return {sendCodeButton, setCodeSent};
};

export {useSendCodeButton}

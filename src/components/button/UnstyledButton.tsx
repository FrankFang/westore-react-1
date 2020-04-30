import React, {forwardRef, useEffect, useRef, useState} from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  autoDisable?: boolean;
  autoDisableDuration?: number;
}

const UnstyledButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    onClick: outerOnClick, disabled: outerDisabled,
    children, autoDisable, autoDisableDuration, ...rest
  } = props;
  const timers = useRef<[number | null, number | null]>([null, null]);
  const needCancelDisable = useRef<boolean>(false);
  const onClick: typeof outerOnClick = (e) => {
    if (autoDisable) {
      needCancelDisable.current = true;
      timers.current[0] = setTimeout(() => {
        setDisabled(true);
      }, 0);
      timers.current[1] = setTimeout(() => {
        if (needCancelDisable.current) {
          setDisabled(false);
          needCancelDisable.current = false;
        }
      }, props.autoDisableDuration);
    }
    outerOnClick?.(e);
  };
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!!outerDisabled);
    needCancelDisable.current = false;
  }, [outerDisabled]);
  useEffect(() => {
    const timersRef = timers.current;
    return () => {
      timersRef.forEach(id => {
        id && window.clearTimeout(id);
      });
    };
  }, []);

  return (
    <button ref={ref} {...rest} onClick={onClick} disabled={disabled}>{children}</button>
  );
});
UnstyledButton.defaultProps = {
  autoDisable: true,
  autoDisableDuration: 1000,
  type: 'button'
};


export {UnstyledButton};

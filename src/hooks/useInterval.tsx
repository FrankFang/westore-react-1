import {useEffect, useRef} from 'react';

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<typeof callback>(callback);
  const timer = useRef<number | null>(null);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = timer.current = window.setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);


  return {timer};
}

export {useInterval};

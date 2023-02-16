import { useCallback, useEffect, useState } from 'react';

export const interval =
  (delay = 0) => (callback: any) => useEffect(() => {
    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, [callback]);

const use1Second = interval(1e3);

export const useTimer = ({
  'seconds': initialSeconds = 0,
  'running': initiallyRunning = false
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);
  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds + 1) : undefined),
    [running]
  );
  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(0);
  const updateRecordingTime = (recordingTime: number) => {
    setSeconds(recordingTime);
  };
  const stop = () => {
    pause();
    // reset();
  };

  use1Second(tick);

  return { pause, reset, running, seconds, start, stop, updateRecordingTime };
};

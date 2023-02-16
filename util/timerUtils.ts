export const toHHMMSS = (secs: number) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

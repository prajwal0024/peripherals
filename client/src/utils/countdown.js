export const countdownTimer = (duration, setDuration, setCountdown) => {
  let minutes, seconds;
  setTimeout(() => {
    if (duration > 0) {
      minutes = parseInt(Math.floor(duration / 60));
      seconds = parseInt(Math.floor(duration % 60));

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      setCountdown(`${minutes} : ${seconds}`);
      duration > 1 && setDuration(duration - 1);
    }
  }, 1000);
};

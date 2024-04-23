import React, { useEffect, useState, useRef } from 'react'

export const Timer = () => {
  const[TimerDays, SetDays] = useState("00");
  const[TimerHours, SetHours] = useState("00");
  const[TimerMinutes, SetMinutes] = useState("00");
  const[TimerSeconds, SetSeconds] = useState("00");
  let Interval = useRef();

  const StartTimer = () => {
    const CountDownDate = new Date("April 24, 2024 00:00:00").getTime();

    Interval = setInterval(() => {
      const Now = new Date().getTime();
      const Distance = CountDownDate - Now;

      const Days = Math.floor(Distance / (1000 * 60 * 60 * 24));
      const Hours = Math.floor((Distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const Minutes = Math.floor((Distance % (1000 * 60 * 60) / (1000 * 60)));
      const Seconds = Math.floor((Distance % (1000 * 60) / 1000));

      if (Distance < 0)
      {
        clearInterval(Interval.current);
      }
      else 
      {
        SetDays(Days);
        SetHours(Hours);
        SetMinutes(Minutes);
        SetSeconds(Seconds);
      }
    }, 1000)
  }

  useEffect(() => {
    StartTimer();
    return () => {
      clearInterval(Interval.current);
    }
  });

  return (
    <div>
      <p>{TimerDays}</p>
      <p>{TimerHours}</p>
      <p>{TimerMinutes}</p>
      <p>{TimerSeconds}</p>
    </div>
  )
}
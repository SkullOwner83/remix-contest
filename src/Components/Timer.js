import React, { useEffect, useState, useRef } from 'react'

export const Timer = ({DueDate}) => {
  const[TimerDays, SetDays] = useState("00");
  const[TimerHours, SetHours] = useState("00");
  const[TimerMinutes, SetMinutes] = useState("00");
  const[TimerSeconds, SetSeconds] = useState("00");
  let Interval = useRef();

  const StartTimer = () => {
    const CountDownDate = new Date(DueDate).getTime();

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

  //HTML section
  return (
    <div className="Timer-Container">
      <div>  
        <p className="Counter-Text">{TimerDays}</p>
        <p className="Title">Días</p>
      </div>

      <div>
        <p className="Counter-Text">{TimerHours}</p>
        <p className="Title">Horas</p>
      </div>

      <div>
        <p className="Counter-Text">{TimerMinutes}</p>
        <p className="Title">Minutos</p>
      </div>

      <div>
        <p className="Counter-Text">{TimerSeconds}</p>
        <p className="Title">Segundos</p>
      </div>
    </div>
  )
}
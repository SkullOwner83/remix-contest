import React, { useEffect, useState, useRef } from 'react'
import { FormatZeroPadding } from "../Functions.js";

export const Timer = ({DueDate}) => {
  const[TimerDays, SetDays] = useState("00");
  const[TimerHours, SetHours] = useState("00");
  const[TimerMinutes, SetMinutes] = useState("00");
  const[TimerSeconds, SetSeconds] = useState("00");
  let Interval = useRef();

  const StartTimer = () => {
    const CountDownDate = new Date(DueDate).getTime();

    //Set up a timer that updates the count down every second
    Interval = setInterval(() => {
      //Calculate the current date in miliseconds and get the diference between the count down date
      const Now = new Date().getTime();
      const Distance = CountDownDate - Now;

      //Calculate the quantity of days, hours, minutes and seconds after the time difference is subtracted
      const Days = Math.floor(Distance / (1000 * 60 * 60 * 24));
      const Hours = Math.floor((Distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const Minutes = Math.floor((Distance % (1000 * 60 * 60)) / (1000 * 60));
      const Seconds = Math.floor((Distance % (1000 * 60) / 1000));

      //Clean the interval when the count down is finished
      if (Distance < 0)
      {
        clearInterval(Interval.current);
      }
      else 
      {
        //Update the state with the new values
        SetDays(FormatZeroPadding(Days));
        SetHours(FormatZeroPadding(Hours));
        SetMinutes(FormatZeroPadding(Minutes));
        SetSeconds(FormatZeroPadding(Seconds));
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
        <p className="Counter-Text">{ TimerDays }</p>
        <p className="Title">Días</p>
      </div>
      <span>:</span>
      <div>
        <p className="Counter-Text">{ TimerHours }</p>
        <p className="Title">Horas</p>
      </div>
      <span>:</span>
      <div>
        <p className="Counter-Text">{ TimerMinutes }</p>
        <p className="Title">Minutos</p>
      </div>
      <span>:</span>
      <div>
        <p className="Counter-Text">{ TimerSeconds }</p>
        <p className="Title">Segundos</p>
      </div>
    </div>
  )
}
import React, { useEffect, useRef } from "react"

export const Slider = ({ id, min, max, step, value, color, orientation, className, onChange}) => {

    //HTML section
    return (
        <div id={id} className={`Slider-Component ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                aria-orientation={orientation}
                style={{background: `linear-gradient(90deg, ${color} ${value*100}%, white ${value*100}%)`}}
            />
        </div>
    );
}

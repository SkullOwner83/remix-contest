import React from "react";
import { ReactComponent as ImgClose } from "../Images/Icons/Close.svg";

export const Modal = ({ Image, Alt, className, onClose }) => {
    //HTML section
    return (
        <div className={`Modal-Component ${className}`}>
            <div className="Modal-Overlay" onClick={onClose}/>
            <div className="Modal-Content">
                <img src={Image} alt={Alt}/>
                <button onClick={onClose}><ImgClose/></button>
            </div>
        </div>
    )
}

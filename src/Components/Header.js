import React from "react"
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import ImgBurger from "../Images/Icons/Burger Menu.svg";

import ImgLogo from "../Images/Logos/Logo.png";

export const Header = () => {
    const NavbarLinks = ["INICIO", "RESULTADOS", "CONTACTO"];
    const [Navbar, SetNavbar] = useState(false);
    const [MenuOpened, SetMenuOpened] = useState(false);
    const NavbarRef = useRef(null);

    //check if you have scrolled to the indicated point to show the navbar
    useEffect(() => {
        function ShowNavbar() {
            if (window.scrollY >= 150) {
                SetNavbar(true);
            }
            else {
                SetNavbar(false);
            }
        }
    
        window.addEventListener("scroll", ShowNavbar);
        return () => window.removeEventListener("scroll", ShowNavbar);
    })

    //Check if clicking outside of navbar to close the hamburger button
    useEffect(() => {
        function handleClickOutside(event) {
            if (NavbarRef.current && !NavbarRef.current.contains(event.target)) {
                SetMenuOpened(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleOpenBurgerMenu() {
        SetMenuOpened(!MenuOpened);
    }

    //HTML section
    return (
        <header className={Navbar | MenuOpened ? "Activate" : ""} ref={NavbarRef}>
            <div className="Logo-Container"><img src={ImgLogo} alt="Logo"/></div>
            
            {/* Get each element from NavBar array and add it in navigation list menu */}          
            <ul className={MenuOpened ? "Opened Navigation-Container" : "Navigation-Container"}>
                {
                    NavbarLinks.map(element => {
                    return( <li key={element}>
                                <Link to={"/" + element.toLocaleLowerCase()} className="Link">{element}</Link>
                            </li>)
                    })
                }
            </ul>

            <button className="Burger-Button" onClick={() => handleOpenBurgerMenu()}><img src={ImgBurger} alt="Menu de hamburgesa"/></button>
        </header>
    )
}

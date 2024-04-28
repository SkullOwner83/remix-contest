import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom"

export const Header = () => {
    const NavbarLinks = ["INICIO", "RESULTADOS", "NOSOTROS", "CONTACTO"];
    const [Navbar, SetNavbar] = useState(false);

    //check if you have scrolled to the indicated point to show the navbar
    function ShowNavbar() {
        if (window.scrollY >= 150) {
            SetNavbar(true);
        }
        else {
            SetNavbar(false);
        }
    }

    window.addEventListener("scroll", ShowNavbar);

    return (
        <header className={Navbar ? "Activate" : ""}>
            {/* Get each element from NavBar array and add it in navigation list menu */}          
            <ul className="Navigation-Container Centered-Container Flex-Row">
                {
                    NavbarLinks.map(element => {
                    return( <li key={element}>
                                <Link to={"/" + element.toLocaleLowerCase()} className="Link">{element}</Link>
                            </li>)
                    })
                }
            </ul>
        </header>
    )
}

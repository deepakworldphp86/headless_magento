import React from "react";
import CatLinks from "../dataCollection/category"; 

export default function Header() {
    
    return (
        <header>
            <nav>
               <CatLinks />
            </nav>
        </header>
    );
}
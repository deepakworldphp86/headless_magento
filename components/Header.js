import React from "react";
import CatLinks from "../dataCollection/category";

export default function Header() {

    return (
        <div>
            <header>
                <nav  className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <CatLinks />
                </nav>
            </header>
        </div>
    );
}
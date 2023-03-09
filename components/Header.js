import React from "react";
import CatLinks from "../dataCollection/category";

export default function Header() {

    return (
        <div>
            <header>
                <nav>
                    <CatLinks />
                </nav>
            </header>
        </div>
    );
}
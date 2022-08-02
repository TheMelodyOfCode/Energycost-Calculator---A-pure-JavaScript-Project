"use strict"

/**
 * The class Navigation generates the Header and the Navigation-Bar
 * It's the foundation were the application bilds up on
 */
class Navigation {

        constructor() {
            this._navbar = this._generateNavbar();
            this._header = this._generateHeader();
        }

        /**
         * Generates the Navbar
         * @returns navbar
         */
        _generateNavbar(){
            let navbar = document.createElement("nav");
            navbar.setAttribute("id", "navbar", "class", "navbar");
            navbar.innerHTML = `
            <nav id="navbar" class="navbar">
                <a href="#default" id="logo3">Energie Kosten</a>
                <div class="nav-container">
                <a href="#default" id="logo2">Energie Kosten</a>
                <a class="nav-el" href="index.html"><i class="fa-solid fa-fire-flame-curved"></i> Gas</a>
                <a class="nav-el" href="energy.html"><i class="fa-solid fa-plug-circle-exclamation"></i> Strom</a>
                <a class="active nav-el" href="water.html"><i class="fa-solid fa-water"></i> Wasser</a>
                <a class="nav-el" href="spockTheGame.html"><i class="fa-solid fa-hand-spock"></i> Spock</a>
                <a class="nav-el"  href="#default" id="logo">Energie Kosten Kontrolle</a>
                </div>
            </nav>`;
            return navbar;
        }

        _generateHeader(){
            let header = document.createElement("header");
            header.setAttribute("id", "header");
 
            return header;
        }
            
        display(){
            let body = document.querySelector("body");
            if (body !== null){
                body.insertAdjacentElement("afterbegin", this._navbar);
                body.insertAdjacentElement("beforeend",this._header);
            }
            
        }

}






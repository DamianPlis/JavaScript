import React from 'react';
import './App.css';

function App() {
    function handleClick() {
        alert("You clicked the button!");
    }
    return (
        <>
            <nav>
                <div className="pravo">

                    <div className="menu" onClick={toggleMenu}>
                        <img className="menu-btn" src="img/tri mece final final.png" height="100" alt="Menu" />
                    </div>
                </div>
                <div className="center">
                    <div className="ozveny">
                        <h1 className="nadpis">LARP</h1>
                    </div>
                    <h4 className="nadpis">
                        Organizujeme malé LARPové akce
                    </h4>
                </div>

                <div className="side-menu" id="sideMenu">
                    <div className="menu-item-s-submenu">
                        <a href="https://burthgulash.github.io/Chynicky_LARP/larphlavni/index.html" className="ma-submenu" onClick={toggleMenu}>Kalendář akcí</a>
                        <div className="submenu">
                            <a href="https://burthgulash.github.io/Chynicky_LARP/Navrat-mocneho/Navrat-mocneho.html" onClick={toggleMenu}>Návrat mocného</a>
                        </div>
                    </div>
                    <a href="https://burthgulash.github.io/Chynicky_LARP/O%20nas/O%20nás.html" onClick={toggleMenu}>O nás</a>
                    <a href="https://burthgulash.github.io/Chynicky_LARP/pribehy/pribehy.html" onClick={toggleMenu}>Příběhy</a>

                    <div className="menu-item-s-submenu">
                        <a href="https://burthgulash.github.io/Chynicky_LARP/Odehrane%20LARPy/Odehrane%20LARPy.html">Odehrané LARPy</a>
                        <div className="submenu">
                            <a href="https://burthgulash.github.io/Chynicky_LARP/Odehrane%20LARPy/Ozveny%20stinu2/Ozvěny%20stínů%202.html" onClick={toggleMenu}>Ozvěny Stínů 2</a>
                            <a href="https://burthgulash.github.io/Chynicky_LARP/Odehrane%20LARPy/Ozveny%20stinu/Ozvěny%20stínů.html" onClick={toggleMenu}>Ozvěny stínů</a>
                            <a href="https://burthgulash.github.io/Chynicky_LARP/Odehrane%20LARPy/Hranicni%20tvrz/Hranicni%20tvrz.html" onClick={toggleMenu}>Hraniční tvrz</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="kalendar-akci">
                <p className="kalendar-nazev">Kalendář akcí</p>
                <div className="kalendar-akci2">

                    <div className="ozveny-stinu2-navrat">
                        <div className="ozveny2-popis">
                            <a href="../Navrat-mocneho/Navrat-mocneho.html">
                                <button className="ozveny-stinu-tlacitko">Návrat mocného</button>
                            </a>
                            <div className="datumy">
                                <div style={{ margin: "0 0 10px 0" }}>
                                    <p className="datum-right">Datum :</p>
                                </div>
                                <div className="moznost">
                                    <p className="datum-left">14.6.2025 - </p>
                                    <p className="datum-left3">15.6.2025</p>
                                </div>
                            </div>
                            <div className="organizatori">
                                <p className="organizatori-text">Organizátoři :</p>
                                <p className="organizatori-text">Kvido Redl</p>
                                <p className="organizatori-text" >Hugo Redl</p>
                                <p className="organizatori-text" >Kristian Páca</p>
                            </div>
                        </div>
                        <div className="ozveny2-img">
                            <img style={{ width: "100%", justifyContent: "center", margin: "5px 0 5px 0" }} />
                        </div>
                    </div>
                    <div className="ozveny-stinu2-coming-soon">
                        <div className="ozveny2-popis">
                            <a href="#">
                                <button className="ozveny-stinu-tlacitko">Již brzy</button>
                            </a>
                            <div className="datumy">
                                <p className="datum-right">Datum :</p>
                                <p className="datum-left">Již brzy</p>
                                <p className="datum-left"></p>
                            </div>
                            <div className="organizatori-div">
                                <p className="organizatori-text">Organizátoři :</p>
                                <p className="organizatori-text">Již brzy</p>
                                <p className="organizatori-text"></p>
                                <p className="organizatori-text"></p>
                            </div>
                        </div>
                        <div className="ozveny2-img">
                            <img style={{ width: "100%", justifyContent: "center", margin: "5px 0 5px 0" }}
                                src="img/questionmark2.2.png" />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );

}
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    const menuButton = document.querySelector(".menu");

    sideMenu.classList.toggle("side-menu-open");
    //  menuButton.classList.toggle("menu-open");

    // Add or remove the outside click listener depending on menu state
    if (sideMenu.classList.contains("side-menu-open")) {
        document.addEventListener("click", menuOutsideClick);
    } else {
        document.removeEventListener("click", menuOutsideClick);
    }
}
// Move this function OUTSIDE toggleMenu!
function menuOutsideClick(event) {
    const sideMenu = document.getElementById("sideMenu");
    const menuButton = document.querySelector(".menu");
    if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
        // Clicked outside the menu and button, so close the menu
        sideMenu.classList.remove("side-menu-open");
        menuButton.classList.remove("menu-open");
        document.removeEventListener("click", menuOutsideClick);
    }
}
function kalendarAkci(props) {
    return (
        <div className="ozveny-stinu2-navrat">
            <div className="ozveny2-popis">
                <a href="../Navrat-mocneho/Navrat-mocneho.html">
                    <button className="ozveny-stinu-tlacitko">Návrat mocného</button>
                </a>
                <div className="datumy">
                    <div style={{ margin: "0 0 10px 0" }}>
                        <p className="datum-right">Datum :</p>
                    </div>
                    <div className="moznost">
                        <p className="datum-left">14.6.2025 - </p>
                        <p className="datum-left3">15.6.2025</p>
                    </div>
                </div>
                <div className="organizatori">
                    <p className="organizatori-text">Organizátoři :</p>
                    <p className="organizatori-text">Kvido Redl</p>
                    <p className="organizatori-text" >Hugo Redl</p>
                    <p className="organizatori-text" >Kristian Páca</p>
                </div>
            </div>
            <div className="ozveny2-img">
                <img style={{ width: "100%", justifyContent: "center", margin: "5px 0 5px 0" }} />
            </div>
        </div>
    )
}

export default App;

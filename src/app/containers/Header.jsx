import React from "react";

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo" src="assets/images/pokemon_logo.png" alt="Pokemon logo" />
            <a className="header__github" href="https://github.com/Sylphony/pokemon-list"><img className="header__github-ribbon" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" /></a>
        </header>
    );
};

export default Header;

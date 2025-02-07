import React from 'react';
import Navigation from "../Components/Navigation";
import Pokemons from "../Components/Pokemons";

function Home(props) {
    return (
        <div>
            <Navigation/>
            <Pokemons />
        </div>
    );
}

export default Home;
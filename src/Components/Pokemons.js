import React, { useEffect, useState } from "react";
/* npm install react-data-table-component */
import DataTables from "react-data-table-component";
import "../styles/Pokemons.css";
import Pokecards from "./Pokecards";

function Pokemons(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemon, setPokemon] = useState(
    "https://pokeapi.co/api/v2/pokemon/151/",
  );

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(
          data.results.map((pokemon) => {
            pokemon.id = pokemon.url.split("/")[6];
            /*pokemon.id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").slice(0, -1)*/
            pokemon.name =
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            return pokemon;
          }),
        );
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement des pokémons en cours...</div>;
  }

  if (error) {
    return <div>Erreur de chargement des Pokémons : {error.message}</div>;
  }

  /* Ici, on définit les colonnes des DataTables */
  const column = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
    },
    {
      name: "nom",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Détails",
      cell: (row) => (
        <button className="showPokemon" onClick={() => setPokemon(row.url)}>
          Afficher
        </button>
      ),
      width: "150px",
    },
  ];
  return (
    <div
      className="pokefull"
      style={{ paddingTop: "10px", paddingBottom: "50px" }}
    >
      <div id={"Tables"}>
        <DataTables
          columns={column}
          data={data}
          title={"Liste des Pokemons"}
          pagination
        ></DataTables>
      </div>
      <Pokecards pokemonToPokecard={pokemon} />
    </div>
  );
}

export default Pokemons;

import React, { useEffect, useState } from "react";
import "../styles/Card.css";

function Pokecards({ pokemonToPokecard }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const listeStat = [
    "PV",
    "Attaque",
    "Défense",
    "Attaque spécial",
    "Défense spécial",
    "Vitesse",
  ];

  useEffect(() => {
    fetch(pokemonToPokecard)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [pokemonToPokecard]);

  if (error) {
    return <div>Erreur de chargement des Pokémons : {error.message}</div>;
  }

  return (
    <div className="pokecard">
      <div className={"card-header"}>
        <ul>
          <li style={{ margin: "5px" }}>Pokedex : {data.id}</li>
          <li>
            <h2 style={{ textTransform: "capitalize", margin: "0" }}>
              {data.name}
            </h2>
          </li>
          <li>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
              alt={""}
            />
          </li>
        </ul>
      </div>
      <div className={"card-body"}>
        <div className={"type"}>
          {data.types?.map((types) => (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/${types.type.url.replace("https://pokeapi.co/api/v2/type/", "").slice(0, -1)}.png`}
              alt={""}
            />
          ))}
        </div>
        <div
          className="stats"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              paddingTop: "10px",
            }}
          >
            {data.stats?.map((stats, id) => (
              <p style={{ fontSize: "13px" }}>
                {listeStat[id]} : {stats.base_stat}
              </p>
            ))}
          </div>
          <div
            style={{
              width: "50%",
            }}
          >
            <p>Taille : {(data.height * 0.1).toPrecision(2)} m</p>
            <p>Poids : {Math.round(data.weight * 0.45)} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokecards;

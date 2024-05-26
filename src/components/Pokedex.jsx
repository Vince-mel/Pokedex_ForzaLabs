import React, { useState, useEffect } from "react";
import { FaGithub, FaRocket } from "react-icons/fa";

import {
  Paper,
  Text,
  Box,
  TextInput,
  Container,
  Loader,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets /img/Logo2.png";
import Logo2 from "../assets /img/logo.png";

const typeColors = {
  fire: "red",
  electric: "yellow",
  grass: "green",
  poison: "green",
  water: "blue",
  bug: "green",
  normal: "silver",
  flying: "orange",
  rock: "brown",
  ground: "brown",
  dragon: "gold",
  psychic: "purple",
  ice: "blue",
  fighting: "red",
  ghost: "black",
  fairy: "pink",
};

const Pokedex = () => {
  const theme = useMantineTheme();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=150`
        );
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};

        const promises = results.map((pokemon, index) => {
          return axios.get(pokemon.url).then((response) => {
            const { data } = response;
            newPokemonData[index + 1] = {
              id: index + 1,
              name: pokemon.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                index + 1
              }.png`,
              type: data.types[0].type.name,
            };
          });
        });

        await Promise.all(promises);
        setPokemonData(newPokemonData);
      } catch (error) {
        console.error("An error occurred while fetching the data: ", error);
      }
    };

    fetchData();
  }, []);

  const formatPokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.black,
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <a
        href="https://github.com/Vince-mel/Pokedex_ForzaLabs"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        <FaGithub size={60} color="white" />
      </a>

      <a
        href="https://vince-mel-portfolio.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          color: "white",
          textDecoration: "none",
        }}
      >
        <FaRocket size={45} />
        <span style={{ marginLeft: 10 }}>Portfolio</span>
      </a>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            marginBottom: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            marginTop: "-64px",
          }}
        >
          <img
            src="https://tmpfiles.nohat.cc/m2i8N4N4K9i8K9d3.png"
            alt="Poké Ball"
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
              marginBottom: "20px",
            }}
            display="block"
          />
          <img
            src={Logo2}
            alt="Logo2"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
        </div>
      </Box>

      <Box
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <div
          style={{
            width: "300px",
            backgroundColor: "white",
            borderRadius: "50px",
            boxShadow: "0 2px 9px 1px rgba(0,0,0,0.2)",
            display: "flex",

            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <Search style={{ marginRight: "10px" }} />
          <TextInput
            placeholder="Search for a Pokemon..."
            value={filter}
            onChange={handleSearchChange}
            radius="xl"
            styles={{
              input: { border: "none" },
              backgroundColor: "white",
              flex: 1,
            }}
          />
        </div>
      </Box>

      <Container
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {Object.keys(pokemonData).length > 0 ? (
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Object.keys(pokemonData).map((pokemonId) => {
              const pokemon = pokemonData[pokemonId];
              const pokemonName = pokemon.name.toLowerCase();
              if (pokemonName.includes(filter)) {
                return (
                  <Box
                    key={pokemonId}
                    style={{
                      width: "280px",
                      margin: "10px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "transform 0.3s",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      borderColor: typeColors[pokemon.type] || "white",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.20)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Paper
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "white",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onClick={() => navigate(`/${pokemonId}`)}
                      clickable
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "200px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor:
                              typeColors[pokemon.type] || "white",
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                          }}
                        />
                        <div
                          style={{
                            width: "180px",
                            height: "180px",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            overflow: "hidden",

                            transition: "transform 0.3s",
                          }}
                        >
                          <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              transition: "transform 0.3s",
                            }}
                          />
                        </div>
                      </div>
                      <Divider style={{ margin: "20px 0" }} />
                      <Text
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginBottom: "10px",
                          textAlign: "center",
                          color: "Black",
                        }}
                      >
                        {formatPokemonName(pokemon.name)}
                      </Text>
                    </Paper>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        ) : (
          <Loader style={{ marginTop: "20px" }} />
        )}
      </Container>
    </div>
  );
};

export default Pokedex;

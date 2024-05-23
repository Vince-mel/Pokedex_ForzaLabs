import React, { useState, useEffect } from "react";
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
import Logo from "../assets/img/Logo2.png";
import Logo2 from "../assets/img/logo.png";

const Pokedex = () => {
  const theme = useMantineTheme();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((response) => {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const formatPokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // ...

  return (
    <div
      style={{
        backgroundColor: theme.colors.dark[7],
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "200px", maxHeight: "200px", marginRight: "20px" }}
        />
        <img
          src={Logo2}
          alt="Logo2"
          style={{ maxWidth: "120px", maxHeight: "120px" }}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <TextInput
          placeholder="Search Pokemon"
          icon={<Search />}
          value={filter}
          onChange={handleSearchChange}
          style={{ width: "300px" }}
        />
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
                      borderColor: "white",
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
                        backgroundColor: "black",
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
                            width: "180px",
                            height: "180px",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            overflow: "hidden",
                            borderRadius: "50%",
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
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
                          color: "white",
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

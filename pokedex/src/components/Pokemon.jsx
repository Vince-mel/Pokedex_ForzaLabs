import React, { useState, useEffect } from "react";
import { FaGithub, FaRocket } from "react-icons/fa";

import {
  Text,
  Loader,
  Button,
  Badge,
  Group,
  Image,
  Center,
  Divider,
  Container,
  Grid,
  Flex,
  Box,
} from "@mantine/core";
import LinearProgress from "@mui/material/LinearProgress";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
const Pokemon = () => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((err) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    if (!pokemon) {
      return <Loader color="black" />;
    }

    const { name, id, height, weight, types, sprites, stats } = pokemon;
    const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const { front_default } = sprites;

    const mainTypeColor = typeColors[types[0].type.name];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "20px",
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

        <div
          style={{
            width: "600px",
            height: "400px",
            backgroundColor: "#f0f0f0",
            borderRadius: "50px",
            boxShadow: "0 2px 9px 1px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
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
          <Container style={{ width: "700px", height: "700px" }}>
            <Center
              style={{
                flexDirection: "column",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Box
                shadow="md"
                padding="md"
                style={{
                  margin: "auto",

                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  borderColor: mainTypeColor,
                  borderWidth: "3px",
                  borderStyle: "solid",
                }}
              >
                <Flex
                  direction="column"
                  justify="center"
                  style={{ padding: "1em" }}
                  textAlign="center"
                >
                  <Group
                    position="center"
                    align="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                  >
                    <Text
                      size="xl"
                      weight={700}
                      style={{
                        color: mainTypeColor,
                        textAlign: "center",
                        fontSize: "2.5em",
                        fontFamily: "Arial Black",
                        textTransform: "capitalize",
                      }}
                    >
                      #{id} {toFirstCharUppercase(name)}
                    </Text>
                    <Image
                      src={front_default}
                      alt="Sprite"
                      width={110}
                      height={110}
                    />
                  </Group>
                  <Image
                    src={fullImageUrl}
                    alt="pokemon"
                    width={300}
                    height={300}
                    mx="auto"
                    my="md"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                    }}
                  >
                    <Text
                      size="lg"
                      weight={700}
                      style={{
                        color: "black",
                        textDecoration: "underline",
                        textTransform: "capitalize",
                      }}
                    >
                      Pokemon Info
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: "0 0 45%", marginBottom: "20px" }}>
                        <Group position="center" spacing="xs">
                          <Text
                            style={{
                              color: "black",
                              fontSize: "1.2em",
                              textTransform: "capitalize",
                            }}
                          >
                            Height:
                          </Text>
                          <Badge color="gray">{height}</Badge>
                        </Group>
                        <Group position="center" spacing="xs">
                          <Text
                            style={{
                              color: "black",
                              fontSize: "1.2em",
                              textTransform: "capitalize",
                            }}
                          >
                            Weight:
                          </Text>
                          <Badge color="gray">{weight}</Badge>
                        </Group>
                      </div>
                      <div style={{ flex: "0 0 45%", marginBottom: "20px" }}>
                        <Text
                          size="md"
                          weight={700}
                          style={{
                            color: "black",
                            textDecoration: "underline",
                            textTransform: "capitalize",
                          }}
                        >
                          Types:
                        </Text>
                        <Group spacing="xs" position="center">
                          {types.map((typeInfo) => {
                            const { type } = typeInfo;
                            const { name } = type;
                            return (
                              <Badge
                                key={name}
                                style={{
                                  color: typeColors[name] || "gray",
                                  fontSize: "1em",
                                  textTransform: "capitalize",
                                  fontFamily: "Comic Sans MS",
                                }}
                              >
                                {name}
                              </Badge>
                            );
                          })}
                        </Group>
                      </div>
                    </div>
                  </div>

                  <Divider my="xl" />

                  <Text
                    size="md"
                    weight={700}
                    style={{
                      color: "black",
                      textDecoration: "underline",
                      textTransform: "capitalize",
                    }}
                    mb="xs"
                  >
                    Stats:
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {stats.map((statInfo) => {
                      const { base_stat, stat } = statInfo;
                      const { name } = stat;
                      const normalizedBaseStat = Math.min(100, base_stat);
                      return (
                        <div
                          style={{ flex: "0 0 45%", marginBottom: "20px" }}
                          key={name}
                        >
                          <Group
                            style={{ width: "100%" }}
                            display={Flex}
                            flexDirection="column"
                          >
                            <Group
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={{
                                  color: "black",
                                  fontSize: "1.2em",
                                  textTransform: "capitalize",
                                }}
                              >
                                {name}:
                              </Text>
                              <Text
                                style={{
                                  color: "black",
                                  fontSize: "1.2em",
                                  textTransform: "capitalize",
                                }}
                              >
                                {base_stat}
                              </Text>
                            </Group>
                            <LinearProgress
                              variant="determinate"
                              value={normalizedBaseStat}
                              style={{ width: "150px", height: "10px" }}
                            />
                          </Group>
                        </div>
                      );
                    })}
                  </div>

                  <Grid mt="md" gap={2}>
                    <Button
                      onClick={() => navigate("/")}
                      style={{
                        backgroundColor: mainTypeColor,
                        border: 0,
                        height: 42,
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: "30%",
                        marginTop: "20px",
                      }}
                    >
                      Back to Home
                    </Button>
                  </Grid>
                </Flex>
              </Box>
            </Center>
          </Container>
        </div>
      </div>
    );
  };

  return <>{generatePokemonJSX()}</>;
};

export default Pokemon;

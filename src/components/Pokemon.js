import React, { useState, useEffect } from "react";
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
  Col,
  Box,
} from "@mantine/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const typeColors = {
  fire: "red",
  electric: "yellow",
  grass: "green",
  poison: "green",
  water: "blue",
  bug: "green",
  normal: "grey",
  flying: "orange",
  rock: "brown",
  ground: "brown",
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

    // Get the color of the main type of the Pokémon
    const mainTypeColor = typeColors[types[0].type.name];
    return (
      <Container maxWidth="300px" maxHeight="300px">
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
              height: "10%",
              width: "50%",
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
    );
  };

  return <>{generatePokemonJSX()}</>;
};

export default Pokemon;

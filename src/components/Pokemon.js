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

    // Ottieni il colore del tipo principale del Pokémon
    const mainTypeColor = typeColors[types[0].type.name];

    return (
      <Container MaxWidth="300px" MaxHeight="300px">
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
              height: "70%",
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
              text-align="center"
            >
              <Group
                position="center"
                align="center"
                display="flex"
                align-items="center"
                justify="center"
                margin="auto"
              >
                <Text
                  size="xl"
                  weight={700}
                  style={{
                    color: mainTypeColor,
                    textAlign: "center",
                    fontSize: "2em",
                    fontFamily: "Comic Sans MS",
                  }}
                >
                  #{id} {toFirstCharUppercase(name)}
                </Text>
                <Image
                  src={front_default}
                  alt="Sprite"
                  width={80}
                  height={80}
                />
              </Group>
              <Image
                src={fullImageUrl}
                alt="pokemon"
                width={200}
                height={200}
                mx="auto"
                my="md"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <Text
                size="lg"
                weight={700}
                style={{ color: "black", textDecoration: "underline" }}
                mb="xs"
              >
                Pokemon Info
              </Text>
              <Grid gutter="xl" cols={2}>
                <Grid.Col>
                  <Group position="center" spacing="xs">
                    <Text style={{ color: "black" }}>Height:</Text>
                    <Badge color="gray">{height}</Badge>
                  </Group>
                  <Group position="center" spacing="xs">
                    <Text style={{ color: "black" }}>Weight:</Text>
                    <Badge color="gray">{weight}</Badge>
                  </Group>
                </Grid.Col>
                <Grid.Col>
                  <Text
                    size="md"
                    weight={700}
                    style={{ color: "black", textDecoration: "underline" }}
                    mb="xs"
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
                            textTransform: "uppercase",
                            fontFamily: "Comic Sans MS",
                          }}
                        >
                          {name}
                        </Badge>
                      );
                    })}
                  </Group>
                </Grid.Col>
              </Grid>

              <Divider my="sm" />

              <Text
                size="md"
                weight={700}
                style={{ color: "black", textDecoration: "underline" }}
                mb="xs"
              >
                Stats:
              </Text>

              <Grid gutter="xs" cols={2}>
                {stats.map((statInfo) => {
                  const { base_stat, stat } = statInfo;
                  const { name } = stat;
                  const normalizedBaseStat = Math.min(100, base_stat);
                  return (
                    <Grid.Col key={name}>
                      <Group
                        position="center"
                        align="center"
                        style={{ width: "100%" }}
                      >
                        <Text style={{ color: "black", width: "100px" }}>
                          {name}:
                        </Text>
                        <Text style={{ color: "black", width: "50px" }}>
                          {base_stat}
                        </Text>
                        <LinearProgress
                          variant="determinate"
                          value={normalizedBaseStat}
                          style={{ width: "150px", height: "10px" }}
                        />
                      </Group>
                    </Grid.Col>
                  );
                })}
              </Grid>

              <Grid mt="md" gap={2}>
                <Button
                  onClick={() => navigate("/")}
                  style={{
                    backgroundColor: "#1a90ff",
                    border: 0,
                    height: 42,
                    paddingLeft: 20,
                    paddingRight: 20,
                    width: "100%",
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

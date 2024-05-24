import React, { useState, useEffect } from "react";
import {
  Text,
  Loader,
  Button,
  Badge,
  Group,
  Image,
  Center,
  Stack,
  Paper,
  Divider,
} from "@mantine/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

    return (
      <Center style={{ flexDirection: "column" }}>
        <Paper
          shadow="md"
          p="md"
          withBorder
          style={{
            width: "350px",
            height: "450px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          <Group position="apart" align="center">
            <Text size="xl" weight={700} style={{ color: "black" }}>
              #{id} {toFirstCharUppercase(name)}
            </Text>
            <Image src={front_default} alt="Sprite" width={50} height={50} />
          </Group>
          <Image
            src={fullImageUrl}
            alt="pokemon"
            width={200}
            height={200}
            mx="auto"
            my="md"
          />
          <Text
            size="lg"
            weight={700}
            style={{ color: "black", textDecoration: "underline" }}
            mb="xs"
          >
            Pokemon Info
          </Text>
          <Group position="apart" spacing="xs">
            <Text style={{ color: "black" }}>Height:</Text>
            <Badge color="gray">{height}</Badge>
          </Group>
          <Group position="apart" spacing="xs">
            <Text style={{ color: "black" }}>Weight:</Text>
            <Badge color="gray">{weight}</Badge>
          </Group>
          <Divider my="sm" />
          <Text
            size="md"
            weight={700}
            style={{ color: "black", textDecoration: "underline" }}
            mb="xs"
          >
            Types:
          </Text>
          <Group spacing="xs">
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              return (
                <Badge key={name} color="gray">
                  {name}
                </Badge>
              );
            })}
          </Group>
          <Divider my="sm" />
          <Text
            size="md"
            weight={700}
            style={{ color: "black", textDecoration: "underline" }}
            mb="xs"
          >
            Stats:
          </Text>
          <Stack spacing="xs">
            {stats.map((statInfo) => {
              const { base_stat, stat } = statInfo;
              const { name } = stat;
              const normalizedBaseStat = Math.min(100, base_stat);
              return (
                <Group
                  key={name}
                  position="apart"
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
                    style={{
                      width: "100px",
                      height: "10px",
                      borderRadius: "5px",
                    }}
                    variant="determinate"
                    value={normalizedBaseStat}
                  />
                </Group>
              );
            })}
          </Stack>
          <Button
            fullWidth
            mt="md"
            onClick={() => navigate("/")}
            styles={{
              root: {
                backgroundColor: "#1a90ff",
                border: 0,
                height: 42,
              },
            }}
          >
            Go Back
          </Button>
        </Paper>
      </Center>
    );
  };

  return (
    <Center
      style={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {generatePokemonJSX()}
    </Center>
  );
};

export default Pokemon;

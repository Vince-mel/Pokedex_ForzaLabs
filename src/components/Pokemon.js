import React, { useState, useEffect } from "react";
import {
  Text,
  Loader,
  Button,
  Badge,
  Progress,
  Group,
  Image,
  Container,
  Center,
} from "@mantine/core";
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
      return <Loader color="white" />;
    }

    const { name, id, height, weight, types, sprites, stats } = pokemon;
    const fullImageUrl = `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
    const { front_default } = sprites;

    return (
      <Center style={{ flexDirection: "column" }}>
        <Group position="apart" align="center" mx="md">
          <Text size="xl" weight={700} style={{ color: "white" }}>
            #{id} {toFirstCharUppercase(name)}
          </Text>
          <Image src={front_default} alt="Sprite" width={50} height={50} />
        </Group>
        <Image
          src={fullImageUrl}
          alt="pokemon"
          width={300}
          height={300}
          mx="auto"
          mb="md"
        />
        <Text size="lg" weight={700} style={{ color: "white" }} mx="md">
          Pokemon Info
        </Text>
        <Text style={{ color: "white" }} mx="md">
          Height: <Badge color="gray">{height}</Badge>
        </Text>
        <Text style={{ color: "white" }} mx="md">
          Weight: <Badge color="gray">{weight}</Badge>
        </Text>
        <Text size="md" weight={700} style={{ color: "white" }} mx="md">
          Types:
        </Text>
        <Group spacing="xs" mx="md">
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
        <Text size="md" weight={700} style={{ color: "white" }} mx="md">
          Stats:
        </Text>
        <Group direction="column" spacing="xs" mx="md">
          {stats.map((statInfo) => {
            const { base_stat, stat } = statInfo;
            const { name } = stat;
            return (
              <Group key={name} position="apart" align="center">
                <Text style={{ color: "white" }}>{name}:</Text>
                <Text style={{ color: "white" }}>{base_stat}</Text>
                <Progress
                  value={base_stat}
                  size="xl"
                  radius="xs"
                  styles={{
                    bar: { backgroundColor: "yellow" },
                    root: { backgroundColor: "black" },
                  }}
                />
              </Group>
            );
          })}
        </Group>
        {pokemon !== undefined && (
          <Button
            mt="md"
            onClick={() => navigate("/")}
            styles={{
              root: {
                backgroundColor: "#1a90ff",
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,
              },
            }}
          >
            Go Back
          </Button>
        )}
      </Center>
    );
  };

  return (
    <Center
      style={{
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        px={0}
        my="xl"
        style={{
          backgroundColor: "black",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          border: "2px solid white",
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {generatePokemonJSX()}
      </Container>
    </Center>
  );
};

export default Pokemon;

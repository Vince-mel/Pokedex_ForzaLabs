import React from "react";
import { Card, Image, Text, Group } from "@mantine/core";

function PokemonInfo({ pokemon }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{ maxWidth: 400, margin: "auto", marginTop: 20 }}
    >
      <Card.Section>
        <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
      </Card.Section>
      <Group direction="column" spacing="xs" style={{ marginTop: 10 }}>
        <Text weight={500} size="lg">
          {pokemon.name.toUpperCase()}
        </Text>
        <Text>Height: {pokemon.height}</Text>
        <Text>Weight: {pokemon.weight}</Text>
        <Text>
          Types:{" "}
          {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}
        </Text>
      </Group>
    </Card>
  );
}

export default PokemonInfo;

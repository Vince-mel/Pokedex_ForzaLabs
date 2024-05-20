import React, { useState } from "react";
import { MantineProvider, Container, Text, Title } from "@mantine/core";
import SearchBar from "./components/SearchBar";
import PokemonInfo from "./components/PokemonInfo";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const handleSearch = async (name) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error find Pokemon data:", error);
      setPokemon(null);
    }
  };

  return (
    <MantineProvider>
      <Container>
        <Title order={1}>Pokedex-Search</Title>
        <SearchBar onSearch={handleSearch} />
        {pokemon && <PokemonInfo pokemon={pokemon} />}
      </Container>
    </MantineProvider>
  );
}

export default App;

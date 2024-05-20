import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group position="center">
        <TextInput
          placeholder="Please insert Pokemon name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
}

export default SearchBar;

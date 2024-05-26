import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:pokemonId" element={<Pokemon />} />
      </Routes>
    </Router>
  );
};

export default App;

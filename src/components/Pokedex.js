import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  TextField,
  Box,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharuppercase } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo2.png";
import Logo2 from "../assets/img/logo.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    background: {
      default: "#212121",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  pokemonCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    minWidth: "300px",
    minHeight: "450px",
    maxHeight: "400px",
    maxWidth: "200px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    backgroundColor: "#f5f5f5",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  pokemonName: {
    fontSize: "1.8rem",
    fontFamily: "Press Start 2P",
    color: "#00000",
    fontWeight: "bold",
  },

  pokedexContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
    alignContent: "center",
  },
  logo: {
    display: "block",
    maxWidth: "200px",
    maxHeight: "200px",
    margin: "auto",
    marginBottom: "-35px",
  },
  logo2: {
    display: "block",
    maxWidth: "120px",
    maxHeight: "120px",
    marginBottom: "60px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "60%",
    margin: "auto",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: theme.spacing(1),
  },
  searchInput: {
    width: "100%",
    margin: theme.spacing(1),
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

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
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Card
          onClick={() => navigate(`/${pokemonId}`)}
          className={classes.pokemonCard}
        >
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "200px", height: "200px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.pokemonName}
            >{`${id}. ${toFirstCharuppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.searchContainer}>
            <img src={Logo} alt="Logo" className={classes.logo} />
            <img src={Logo2} alt="Logo2" className={classes.logo2} />

            <Box display="flex" alignItems="center">
              <SearchIcon className={classes.searchIcon} />
              <TextField
                className={classes.searchInput}
                onChange={handleSearchChange}
                label="Search Pokemon"
                variant="standard"
                InputProps={{
                  style: { color: "#ffffff" },
                }}
                InputLabelProps={{
                  style: { color: "#ffffff" },
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((pokemonId) => {
            const pokemonName = pokemonData[pokemonId].name.toLowerCase();
            if (pokemonName.includes(filter)) {
              return getPokemonCard(pokemonId);
            }
            return null;
          })}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  );
};

export default Pokedex;

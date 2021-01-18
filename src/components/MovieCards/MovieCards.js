import React, { useState, useEffect, createRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./styles.js";

const infoCards = [
  {
    color: "#1565c0",
    title: "Lastest Movies",
    text: "Give me movies now playing",
  },
  {
    color: "#00838f",
    title: "Movies by title",
    info:
      "Movies: Batman, Avengers, Pirates of the Carribean, Mulan, Soul, etc...",
    text: "Give me movies named",
  },
  {
    color: "#4527a0",
    title: "Movies/TV Shows related to actor/actress",
    info:
      "Actors/Actresses: Tom Hanks, Will Smith, Angelina Jolie, Johnny Deep, Julie Roberts, Tom, etc...",
    text: "Give me movies with actor/actress",
  },
  {
    color: "#C3130D",
    title: "TV Shows by title",
    info:
      "TV shows: Game of Thrones, Family Guy, Law and Order, Breaking Bad, etc...",
    text: "Give me TV shows named ",
  },
];

const MovieCards = ({ movieTitles, activeTitle }) => {
  const classes = useStyles();

  if (!movieTitles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5" className={classes.card_text}>
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h6" className={classes.card_text}>
                    <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography varaint="h6" className={classes.saying_text}>
                  Try saying: <br />
                  <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        spacing={3}
        alignContent="stretch"
      >
        {movieTitles.map((movieTitle, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <MovieCard
              movieTitle={movieTitle}
              activeTitle={activeTitle}
              i={i}
            />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default MovieCards;

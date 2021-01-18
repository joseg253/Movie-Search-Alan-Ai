import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles.js";
import classNames from "classnames";
import ActorCard from "../ActorCard/ActorCards";
import Snackbar from "@material-ui/core/Snackbar";
import { fetchMovieDetails, fetchTvDetails } from "../../services/index.js";

const MovieCard = ({
  movieTitle: {
    overview,
    release_date,
    title,
    poster_path,
    name,
    first_air_date,
    known_for,
    profile_path,
    id,
  },
  i,
  activeTitle,
}) => {
  const classes = useStyles();
  const [details, setDetails] = useState([]);
  const [runTime, setRunTime] = useState("");
  const [tvDetails, setTvDetails] = useState([]);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours === 0) {
      return rminutes + " min";
    }

    return rhours + "h " + rminutes + "min";
  }

  if (known_for) {
    let arr = [];
    known_for.map((item) => {
      arr.push({
        movie_title: item.title,
        movie_url: item.poster_path,
        movie_name: item.name,
        movie_orginal_title: item.orginal_title,
      });
    });

    return (
      <ActorCard
        name={name}
        known_for={known_for}
        profile_path={profile_path}
        arr={arr}
        activeTitle={activeTitle}
        i={i}
      ></ActorCard>
    );
  }

  return (
    <>
      <Snackbar
        style={{ paddingTop: "4rem" }}
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        message={
          title != null
            ? 'Commands: "yes", "no", "go back", "Show me trailer for movie number..." '
            : 'Commands: "yes", "no", "go back" "Show me trailer for show number..." '
        }
      ></Snackbar>
      <Card
        className={classNames(
          classes.card,
          activeTitle === i ? classes.activeCard : null
        )}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              poster_path != null
                ? "https://image.tmdb.org/t/p/w185" + poster_path
                : "https://i.pinimg.com/originals/c8/50/ff/c850ff543a0485c5f53aacb4cf024dca.png"
            }
          />
          <div className={classes.details}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h2"
              className={classes.date_text}
            >
              {release_date != null
                ? release_date.split("-")[0]
                : first_air_date != null
                ? first_air_date.split("-")[0]
                : "Release Unknown"}
            </Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5">
            {title} {name}
          </Typography>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.text}
            >
              {overview != null && overview.length != 0 && overview != undefined
                ? overview
                : "There was no description found for the movie listed"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Trailer
          </Button>
          <Typography variant="h5" color="textSecondary">
            {i + 1}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default MovieCard;

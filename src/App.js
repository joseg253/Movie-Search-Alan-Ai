import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import MovieCards from "./components/MovieCards/MovieCards";
import useStyles from "./styles.js";
import { Typography } from "@material-ui/core";
import movieReel from "./images/movie_reel.jpg";
import { fetchMovieURL, fetchTVURL } from "./services/index";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "94a6a14085b280b6d7526088a358cf202e956eca572e1d8b807a3e2338fdd0dc/prod";
const App = () => {
  const [movieTitles, setMovieTitles] = useState([]);
  const classes = useStyles();
  const [activeTitle, setActiveTitle] = useState(-1);
  const [url, setURL] = useState("");

  useEffect(() => {
    alanBtn({
      key:
        "94a6a14085b280b6d7526088a358cf202e956eca572e1d8b807a3e2338fdd0dc/prod",
      onCommand: ({ command, results, number }) => {
        if (command === "newTitles") {
          setMovieTitles(results);
          setActiveTitle(-1);
        } else if (command === "highlight") {
          setActiveTitle((prevActiveTitle) => prevActiveTitle + 1);
        } else if (command === "open") {
          let parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          console.log(
            "the number is " +
              parsedNumber +
              "and its of type" +
              typeof parsedNumber
          );
          if (typeof parsedNumber == "string") {
            parsedNumber = parseInt(parsedNumber);
          }

          if (parsedNumber > 20 || parsedNumber < 1) {
            alanBtn().playText("Please try that again");
          } else {
            const id = results[parsedNumber - 1].id;

            const trailer = async (id) => {
              const url = await fetchMovieURL(id);
              if (url == null || url == undefined) {
                alanBtn().playText(
                  "Sorry there is no movie trailer for that movie"
                );
              } else {
                window.open(url, "_blank");
              }
            };
            trailer(id);
          }
        } else if (command === "openShow") {
          let parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          if (typeof parsedNumber == "string") {
            parsedNumber = parseInt(parsedNumber);
          }

          if (parsedNumber > 20 || parsedNumber < 1) {
            alanBtn().playText("Please try that again");
          } else {
            const id = results[parsedNumber - 1].id;

            const trailer = async (id) => {
              const url = await fetchTVURL(id);

              if (url == null || url == undefined) {
                alanBtn().playText(
                  "Sorry there is no trailer listed for that show"
                );
              } else {
                window.open(url, "_blank");
              }
            };

            trailer(id);
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <Typography variant="h1" className={classes.title}>
        Movie Search with Alan AI
      </Typography>
      <div className={classes.logoContainer}>
        <img
          src="https://wwwimage-secure.cbsstatic.com/base/files/seo/paramount-movies.jpg"
          className={classes.movieLogo}
        />
      </div>
      <MovieCards
        movieTitles={movieTitles}
        activeTitle={activeTitle}
      ></MovieCards>
    </div>
  );
};

export default App;

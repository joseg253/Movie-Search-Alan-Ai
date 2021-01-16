import React from "react";
import useStyles from "./styles.js";
import classNames from "classnames";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

const ActorCards = ({
  known_for: { title },
  name,
  profile_path,
  arr,
  activeTitle,
  i,
}) => {
  const classes = useStyles();
  console.log(arr);

  return (
    <>
      <Snackbar
        open="true"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        message='Commands: "yes", "no", "go back" '
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
              profile_path != null
                ? "https://image.tmdb.org/t/p/w185" + profile_path
                : "https://creston.k12.mt.us/wp-content/uploads/2014/12/blank-profile.png"
            }
          />
          <Typography className={classes.title} gutterBottom variant="h5">
            {name}
          </Typography>

          <CardContent className={classes.content}>
            <GridList cellHeight="auto" className={classes.gridList}>
              {arr.map((value) => (
                <GridListTile cols={arr.length === 1 ? 1 : 2}>
                  <img
                    src={
                      value.movie_url != null
                        ? "https://image.tmdb.org/t/p/w185" + value.movie_url
                        : "https://i.pinimg.com/originals/c8/50/ff/c850ff543a0485c5f53aacb4cf024dca.png"
                    }
                    style={{
                      height: "150px",
                      width: "100px",
                    }}
                  />

                  <GridListTileBar
                    style={{ fontSize: "12px" }}
                    title={
                      value.movie_title != null
                        ? value.movie_title
                        : value.movie_name != null
                        ? value.movie_name
                        : value.movie_orginal_title != null
                        ? value.movie_orginal_title
                        : "unknown title"
                    }
                    className={classes.titleBar}
                  />
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </CardActionArea>

        <CardActions className={classes.cardActions}>
          <Typography variant="h5" color="textSecondary">
            {i + 1}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default ActorCards;

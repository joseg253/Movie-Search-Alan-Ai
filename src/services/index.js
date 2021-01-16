import axios from "axios";

const API_KEY = "924171499ba90abe211d9784a4e4be50";
const youtube_url = "https://www.youtube.com/watch?v=";
let movie_results = [];
let tv_results = [];

export const fetchMovieURL = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`,
      {}
    );

    const result = youtube_url + data["results"][0].key;
    console.log("url in index is " + result);

    return result;
  } catch (error) {}
};

export const fetchTVURL = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`,
      {}
    );

    const result = youtube_url + data["results"][0].key;
    console.log(result);
    return result;
  } catch (error) {}
};

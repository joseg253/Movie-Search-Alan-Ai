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

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,

      {}
    );
    let arr = [];
    const runtime = data["runtime"];
    const genre = data["genres"];
    const title = data["title"];
    arr.push({ title: title });
    arr.push({ run_time: runtime });
    genre.map((genre) => {
      arr.push({
        name: genre.name,
      });
    });

    return arr;
  } catch (error) {}
};
export const fetchTvDetails = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
      {}
    );

    let arr = [];
    const runtime = data["runtime"];
    const genre = data["genres"];

    arr.push({ runtime: runtime });

    genre.map((genre) => {
      arr.push({
        name: genre.name,
      });
    });

    return arr;
  } catch (error) {}
};

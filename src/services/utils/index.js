
import Config from "react-native-config";

const API_KEY = Config.API_KEY;

export const defaultQuery = {
  api_key: API_KEY,
  language: 'en-US',
  // include_adult: true,
  // region: "ID",
};
export const queryString = obj => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
};

export const getImageUrl = (path, key = "uri", width = "w500") => {
    return { [key]: `${Config.IMAGE_URL}${width}${path}` };
  };


  export const genres = {
    "12": { name: "Adventure" },
    "14": { name: "Fantasy" },
    "16": { name: "Animation" },
    "18": { name: "Drama" },
    "27": { name: "Horror" },
    "28": { name: "Action" },
    "35": { name: "Comedy" },
    "36": { name: "History" },
    "37": { name: "Western" },
    "53": { name: "Thriller" },
    "80": { name: "Crime" },
    "99": { name: "Documentary" },
    "878": { name: "Science Fiction" },
    "9648": { name: "Mystery" },
    "10402": { name: "Music" },
    "10749": { name: "Romance" },
    "10751": { name: "Family" },
    "10752": { name: "War" },
    "10770": { name: "TV Movie" },
    "10759": { name: "Action & Adventure" },
    "10762": { name: "Kids" },
    "10763": { name: "News" },
    "10764": { name: "Reality" },
    "10765": { name: "Sci-Fi & Fantasy" },
    "10766": { name: "Soap" },
    "10767": { name: "Talk" },
    "10768": { name: "War & Politics" },
  };
  
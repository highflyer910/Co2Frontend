import axios from "axios"; // Add the missing import statement for 'axios' module

const baseURL = `${import.meta.env.VITE_APP_BASE_URL_BE}`; // Add the missing baseURL

// axios setting for all the request in the app
export default axios.create({
  baseURL: baseURL,
});

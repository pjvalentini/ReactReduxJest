import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/creators/";

export function getCreators() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

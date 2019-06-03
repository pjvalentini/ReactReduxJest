import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/contacts/";

export function getContacts() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveContact(contact) {
  return fetch(baseUrl + (contact.id || ""), {
    method: contact.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(contact)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteContact(contactId) {
  return fetch(baseUrl + contactId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

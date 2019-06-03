import * as types from "./actionTypes";
import * as contactApi from "../../api/contactApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// Naming conv: verbNoun
// Requires a type and usually a payload

export function loadContactsSuccess(contacts) {
  return { type: types.LOAD_CONTACTS_SUCCESS, contacts };
}

export function createContactSuccess(contact) {
  return { type: types.CREATE_CONTACT_SUCCESS, contact };
}

export function updateContactSuccess(contact) {
  return { type: types.UPDATE_CONTACT_SUCCESS, contact };
}

export function deleteContactOptimistic(contact) {
  return { type: types.DELETE_CONTACT_OPTIMISTIC, contact };
}

// loadCourse Thunk
export function loadContacts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return contactApi
      .getContacts()
      .then(contacts => {
        dispatch(loadContactsSuccess(contacts));
      })
      .catch(error => {
        // dispatching error message here.
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// saveCourse Thunk
export function saveContact(contact) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return contactApi
      .saveContact(contact)
      .then(savedContact => {
        contact.id
          ? dispatch(updateContactSuccess(savedContact))
          : dispatch(createContactSuccess(savedContact));
      })
      .catch(error => {
        // dispatching error message here.
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// deleteCourse Thunk
export function deleteContact(contact) {
  return function(dispatch) {
    // Optimistic delete, so not dispatching begin/end api all
    // actions, or apiCallError action since we are not showing the loading status fo this.
    dispatch(deleteContactOptimistic(contact));
    return contactApi.deleteContact(contact.id);
  };
}

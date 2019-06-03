import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Email</th>
        <th>Created by</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {contacts.map(contact => {
        return (
          <tr key={contact.id}>
            <td>
              <Link className="btn btn-light" to={"/contact/" + contact.slug}>
                Edit
              </Link>
            </td>
            <td>
              <Link to={"/contact/" + contact.slug}>{contact.name}</Link>
            </td>
            <td>{contact.category}</td>
            <td>{contact.creatorName}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(contact)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ContactList;

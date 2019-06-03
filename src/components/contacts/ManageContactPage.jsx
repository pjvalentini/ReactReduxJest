import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadContacts, saveContact } from "../../redux/actions/contactActions";
import { loadCreators } from "../../redux/actions/creatorActions";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm.jsx";
import { newContact } from "../../../tools/mockData";
import Spinner from "../common/Spinner.jsx";
import { toast } from "react-toastify";

// This functional componemt uses react hooks, useEffect allows us to handle state and side effects.
// useState hook
// Our form field will need state in order to hold the form field values before they are saved.
// I dont need to use redux here, Use plain React state foir data only one/few components use like form state.
// adding export here will allow us to test this directly without using redux's Provider ans store.
// This exports an un connected version of the component
export function ManageContactPage({
  contacts,
  creators,
  loadCreators,
  loadContacts,
  saveContact,
  history,
  ...props // Assign any props not descructured to a var called props with the rest op.
}) {
  // useState returns a pair of values, we use array destructuring to assign each value a name.
  // 1st value is the state var, 2nd value is the setter fucntion for that var.
  const [contact, setContact] = useState({ ...props.contact });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contacts.length === 0) {
      loadContacts().catch(error => {
        alert("Loading Contacts Failed" + error);
      });
    } else {
      // if we have courses available then we would like to set the state and course passed in on Props.
      setContact({ ...props.contact });
    }

    if (creators.length === 0) {
      loadCreators().catch(error => {
        alert("Loading Creators Failed" + error);
      });
    }
  }, [props.contact]); // we want a new state anytime a course is passed in, so we need to add this here or else when loading the page or else the prev state will load and no data will be present.

  function handleChange(e) {
    // destructuring here allow us to retain a local ref to the event.
    const { name, value } = e.target;
    // using functional form of setState (setCourse) so I can safely set new state that is based on the existing state.
    setContact(prevContact => ({
      ...prevContact,
      // JS computed prop syntax allows us to ref a prop via a var.
      [name]: name === "creatorId" ? parseInt(value, 10) : value // Events return numbers as strings, so we neeed to convert authorId to int here.
    }));
  }

  // this function will povide some server side validation
  function formIsValid() {
    const { name, creatorId, category } = contact;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!creatorId) errors.creator = "Creator is required.";
    if (!category) errors.category = "Email is required.";

    // set errors will update state if there are any.
    setErrors(errors);
    // Form is valid sit he error object still has no props.
    // This will return onject of properties if there are errors.
    return Object.keys(errors).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    // if form is not valid return the errors
    if (!formIsValid()) return;
    // setSaving is true now as we want to hide the save button while an update is being set.
    setSaving(true);
    // saveCourse is getting passed in on props, so its bound to dispatch.
    // saveCourse return a promise so we can use React Router's 'history' object to redirect.
    saveContact(contact)
      .then(() => {
        toast.success("You have saved your changes!");
        history.push("/contacts");
      })
      .catch(error => {
        ///here we set save to false since we are going to stay on the page
        setSaving(false);
        setErrors({ onSave: error.message }); // comming from the useState() call.
      });
  }

  return creators.length === 0 || contacts.length === 0 ? (
    <Spinner />
  ) : (
    <ContactForm
      contact={contact}
      errors={errors}
      creators={creators}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
ManageContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  creators: PropTypes.array.isRequired,
  contacts: PropTypes.array.isRequired,
  loadContacts: PropTypes.func.isRequired,
  loadCreators: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getContactBySlug(contacts, slug) {
  return contacts.find(contact => contact.slug === slug) || null;
}

// this function determines what part of the state we expose to our component
// ownProps: additional param that is a reference to the components props.
// Can be used to read the URL data injected on props by React router.
function mapStateToProps(state, ownProps) {
  // read the course slug.
  const slug = ownProps.match.params.slug;
  // if there is a slug AND state.courses.length > 0 => getCourseBySlug otherwise set to newCourse.
  const contact =
    slug && state.contacts.length > 0
      ? getContactBySlug(state.contacts, slug)
      : newContact;
  return {
    contact,
    contacts: state.contacts,
    creators: state.creators
  };
}

// If we decalre mapDispatchToProps as an object instead, each property will automatically be bound to dispatch.
const mapDispatchToProps = {
  loadContacts,
  loadCreators,
  saveContact
};

// this is exporting the connected version of this component ad the default export.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageContactPage);

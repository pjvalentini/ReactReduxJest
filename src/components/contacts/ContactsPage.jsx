import React from "react";
import { connect } from "react-redux";
import * as contactActions from "../../redux/actions/contactActions";
import * as creatorActions from "../../redux/actions/creatorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ContactList from "./ContactList.jsx";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner.jsx";
import { toast } from "react-toastify";

class ContactsPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { contacts, creators, actions } = this.props;
    if (contacts.length === 0) {
      actions.loadContacts().catch(error => {
        alert("Loading Contacts Failed" + error);
      });
    }

    if (creators.length === 0) {
      actions.loadCreators().catch(error => {
        alert("Loading Creators Failed" + error);
      });
    }
  }

  // handleDelete method converted to use async/await
  handleDeleteContact = async contact => {
    toast.success("Contact Deleted!");
    try {
      await this.props.actions.deleteContact(contact);
    } catch (error) {
      toast.error("Delete Failed! " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {/*Here we can use the redirect here */}
        {this.state.redirectToAddContactPage && <Redirect to="/contact" />}
        <h2>Contacts</h2>
        {/* This is saying that either load our spinner or show the button and list */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddContactPage: true })} // add this value to state
            >
              Add Contact
            </button>
            <ContactList
              onDeleteClick={this.handleDeleteContact}
              contacts={this.props.contacts}
            />
          </>
        )}
      </>
    );
  }
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
ContactsPage.propTypes = {
  creators: PropTypes.array.isRequired,
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  // be specific request only the data that the comp needs.
  return {
    contacts:
      state.creators.length === 0
        ? []
        : state.contacts.map(contact => {
            return {
              ...contact,
              creatorName: state.creators.find(
                cn => cn.id === contact.creatorId
              ).name
            };
          }),
    creators: state.creators,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // if you don't call dispatch nothing will happen. Actions creator must be called by dispatch.
    // The cleaner way is to use bindActionCreators and will allow us to not have to manually wrap our actionCreators in a dispatch call.
    actions: {
      loadContacts: bindActionCreators(contactActions.loadContacts, dispatch),
      loadCreators: bindActionCreators(creatorActions.loadCreators, dispatch),
      deleteContact: bindActionCreators(contactActions.deleteContact, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsPage);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

// This functional componemt uses react hooks
function ManageCoursePage(courses, authors, loadAuthors, loadCourses) {
  // hooks allow us to handle state and side effects.
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading Courses Failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading Authors Failed" + error);
      });
    }
  }, []); // The empty array as the 2nd arg means the effect will run once when the comp mounts.

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  // be specific request only the data that the comp needs.
  return {
    courses: state.courses,
    authors: state.authors
  };
}

// If we decalre mapDispatchToProps as an object instead, each property will automatically be bound to dispatch.
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

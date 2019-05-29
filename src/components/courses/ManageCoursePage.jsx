import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm.jsx";
import { newCourse } from "../../../tools/mockData";

// This functional componemt uses react hooks, useEffect allows us to handle state and side effects.
// useState hook
// Our form field will need state in order to hold the form field values before they are saved.
// I dont need to use redux here, Use plain React state foir data only one/few components use like form state.
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props // Assign any props not descructured to a var called props with the rest op.
}) {
  // useState returns a pair of values, we use array destructuring to assign each value a name.
  // 1st value is the state var, 2nd value is the setter fucntion for that var.
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
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

  function handleChange(e) {
    // destructuring here allow us to retain a local ref to the event.
    const { name, value } = e.target;
    // using functional form of setState (setCourse) so I can safely set new state that is based on the existing state.
    setCourse(prevCourse => ({
      ...prevCourse,
      // JS computed prop syntax allows us to ref a prop via a var.
      [name]: name === "authorId" ? parseInt(value, 10) : value // Events return numbers as strings, so we neeed to convert authorId to int here.
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    // saveCourse is getting passed in on props, so its bound to dispatch.
    // saveCourse return a promise so we can use React Router's 'history' object to redirect.
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  // be specific request only the data that the comp needs.
  return {
    courses: state.courses,
    authors: state.authors,
    course: newCourse
  };
}

// If we decalre mapDispatchToProps as an object instead, each property will automatically be bound to dispatch.
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

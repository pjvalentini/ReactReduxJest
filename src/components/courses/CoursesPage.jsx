import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList.jsx";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner.jsx";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading Courses Failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading Authors Failed" + error);
      });
    }
  }

  // handleDelete method converted to use async/await
  handleDeleteCourse = async course => {
    toast.success("Course Deleted!");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed! " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {/*Here we can use the redirect here */}
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {/* This is saying that either load our spinner or showe the button and list */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })} // add this value to state
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  // be specific request only the data that the comp needs.
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // if you don't call dispatch nothing will happen. Actions creator must be called by dispatch.
    // The cleaner way is to use bindActionCreators and will allow us to not have to manually wrap our actionCreators in a dispatch call.
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);

import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Loading Courses Failed" + error);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  return {
    courses: state.courses // be specific reques only the data that the comp needs.
  };
}

// Now that we have declared mapDispatchToProps we do not have to pass in dispatch any more as a proptype.
// We can directly pass in the createCourse action.
function mapDispatchToProps(dispatch) {
  return {
    // if you don't call dispatch nothing will happen. Actions creator must be called by dispatch.
    // The cleaner way is to use bindActionCreators and will allow us to not have to manually wrap our actionCreators in a dispatch call.
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);

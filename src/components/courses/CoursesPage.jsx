import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  // we dont need the constructor here or the super(props) as we are using a class property set up here. New Stuff!
  state = {
    course: {
      title: ""
    }
  };

  // this a class field. We can safely use this but will be standard in +/-2020.
  handleChange = e => {
    // the spread operator will copy the course from state, and overwrite the title.
    // with the spread op - the values on the right override those on the left.
    const course = { ...this.state.course, title: e.target.value };

    // this.setState({ course: course }); we can use obj shorthand here to shorten the code.
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    // dispatch allows us to dispatch our actions (we are dispatching createCourse action, and passing it to the course)
    this.props.dispatch(courseActions.createCourse(this.state.course));
    console.log(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h4>Add Course</h4>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

// we expect dispatch to be passed in to the courses page component.
// it will be passed in because connect auto passes dispatch in if we omit "mapDispatchToProps" arg in our call to connect
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

// this function determines what part of the state we expose to our component
// ownProps is an additional param that is a reference to the components own props.
function mapStateToProps(state) {
  return {
    courses: state.courses // be specific reques only the data that the comp needs.
  };
}

export default connect(mapStateToProps)(CoursesPage);

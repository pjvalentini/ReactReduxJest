import React from "react";

class CoursesPage extends React.Component {
  // we dont need the constructor here or the super(props) as we are using a class property set up here. New Stuff!
  state = {
    course: {
      title: ""
    }
  };

  // this a class field. We can safely us this but will be standard in +/-2020.
  handleChange = e => {
    // the spread operator will copy th course from state, and overwrite the title.
    // with the spread op - the values on the right override those on the left.
    const course = { ...this.state.course, title: e.target.value };

    // this.setState({ course: course }); we can use obj shorthand here to shorten the code.
    this.setState({ course });
  };

  render() {
    return (
      <form action="">
        <h2>Courses</h2>
        <h4>Add Course</h4>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default CoursesPage;

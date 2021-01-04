import PropTypes from 'prop-types';
import Course from './Course';

const Courses = ({ courses }) => (
  <div>
    {courses.map(course => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

export default Courses;

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shapeOf({
    id: PropTypes.string,
    name: PropTypes.string,
    parts: PropTypes.arrayOf(
      PropTypes.shapeOf({
        name: PropTypes.string,
        exercises: PropTypes.string,
      }),
    ),
  })).isRequired,
};

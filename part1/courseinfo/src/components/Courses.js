import Course from './Course';

const Courses = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </div>
);

export default Courses;

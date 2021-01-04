import PropTypes from 'prop-types';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name}
    {' '}
    {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (acumulator, { exercises: currentvalue }) => acumulator + currentvalue,
    0,
  );

  return (
    <p>
      total of
      {sum}
      {' '}
      exercises
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;

Header.propTypes = {
  course: PropTypes.string.isRequired,
};

Part.propTypes = {
  part: PropTypes.shapeOf({
    name: PropTypes.string,
    exercises: PropTypes.string,
  }).isRequired,
};

Content.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shapeOf({
      name: PropTypes.string,
      exercises: PropTypes.string,
    }),
  ).isRequired,
};

Total.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shapeOf({
      name: PropTypes.string,
      exercises: PropTypes.string,
    }),
  ).isRequired,
};

Course.propTypes = {
  course: PropTypes.shapeOf({
    name: PropTypes.string,
    parts: PropTypes.arrayOf(
      PropTypes.shapeOf({
        name: PropTypes.string,
        exercises: PropTypes.string,
      }),
    ),
  }).isRequired,
};

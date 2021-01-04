import PropTypes from 'prop-types';

const PersonForm = ({ newRecord: { firstName, lastName, number }, handleChange, handleSubmit }) => (
  <form onSubmit={e => handleSubmit(e)}>
    <h2>Add a new record</h2>
    <div>
      <label htmlFor="firstName">
        first name:
        <input
          required
          onChange={e => handleChange(e)}
          value={firstName}
          name="firstName"
          id="firstName"
        />
      </label>
    </div>
    <div>
      <label htmlFor="lastName">
        last name:
        <input
          required
          onChange={e => handleChange(e)}
          value={lastName}
          name="lastName"
          id="lastName"
        />
      </label>
    </div>
    <div>
      <label htmlFor="number">
        number:
        <input
          required
          onChange={e => handleChange(e)}
          value={number}
          name="number"
          id="number"
          type="tel"
        />
      </label>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;

PersonForm.propTypes = {
  newRecord: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

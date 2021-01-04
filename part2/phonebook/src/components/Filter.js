import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="filter">
      Filter Phonebook
      <input
        type="text"
        onChange={e => handleFilterChange(e)}
        id="filter"
        name="filter"
        value={filter}
      />
    </label>
  </div>
);

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

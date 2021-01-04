import PropTypes from 'prop-types';

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="filter">
      Find Countries
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

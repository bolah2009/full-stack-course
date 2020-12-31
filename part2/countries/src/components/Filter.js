const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor='filter'>Find Countries</label>
    <input
      type='text'
      onChange={(e) => handleFilterChange(e)}
      id='filter'
      name='filter'
      value={filter}
    />
  </div>
);

export default Filter;

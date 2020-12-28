const PersonForm = ({
  newRecord: { firstName, lastName, number },
  handleChange,
  handleSubmit,
}) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <h2>Add a new record</h2>
    <div>
      <label htmlFor='firstName'>first name:</label>
      <input
        required
        onChange={(e) => handleChange(e)}
        value={firstName}
        name='firstName'
        id='firstName'
      />
    </div>
    <div>
      <label htmlFor='lastName'>last name:</label>
      <input
        required
        onChange={(e) => handleChange(e)}
        value={lastName}
        name='lastName'
        id='lastName'
      />
    </div>
    <div>
      <label htmlFor='number'>number:</label>
      <input
        required
        onChange={(e) => handleChange(e)}
        value={number}
        name='number'
        id='number'
        type='tel'
      />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default PersonForm;

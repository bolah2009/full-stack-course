const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    const [country] = countries;

    return (
      <section>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <ul>
          {country.languages.map(({name}) => <li key={name}>{name}</li>)}
        </ul>
        
        <img width="200px" alt={`${country.name} flag`} src={country.flag} />
      </section>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
};

export default Countries;

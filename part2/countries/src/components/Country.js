import Weather from './Weather';

const Country = ({ country }) => (
  <section>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>

    <ul>
      {country.languages.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>

    <img width='200px' alt={`${country.name} flag`} src={country.flag} />
    <Weather name={country.capital} />
  </section>
);

export default Country;

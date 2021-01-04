import PropTypes from 'prop-types';
import Country from './Country';

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    const [country] = countries;

    return <Country country={country} />;
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.name}>
          {country.name}
          <button type="button" onClick={() => showCountry(country)}>
            {' '}
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;

Countries.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shapeOf({
      name: PropTypes.string,
      capital: PropTypes.string,
      population: PropTypes.string,
      languages: PropTypes.array,
    }),
  ).isRequired,
  showCountry: PropTypes.func.isRequired,
};

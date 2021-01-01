import axios from 'axios';
const baseUrl = 'http://localhost:3001/phonebook';

const responseData = (request) => request.then(({ data }) => data);

const getAll = () => {
  const request = axios.get(baseUrl);
  return responseData(request);
};

const create = (newData) => {
  const request = axios.post(baseUrl, newData);
  return responseData(request);
};

const phonebookService = { getAll, create };

export default phonebookService;

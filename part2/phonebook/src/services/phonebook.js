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

const deletePhonebook = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return responseData(request);
};

const update = (id, newData) => {
  const request = axios.put(`${baseUrl}/${id}`, newData);
  return responseData(request);
};

const phonebookService = { getAll, create, deletePhonebook, update };

export default phonebookService;

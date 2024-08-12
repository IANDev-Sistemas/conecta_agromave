import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://obs.grupoagromave.com.br:38080/bdoserver2.7/'; 

const apiPublic = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'result',
    'odw_idTarefa': '3159',
    'odw_descTarefa': 'Conecta Agromave - API - Public - script_function: auth',
  },
});


apiPublic.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiPublic;
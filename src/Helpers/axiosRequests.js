import axios from 'axios';
import { getToken } from './tokenManagement';
import {BASE_URL} from './dbConfig';

// Get request Function
export const apiGetRequest = (endpoint, props = {},token = null ) =>
  apiRequest('GET', endpoint, token , props);

// Post request Function
export const apiPostRequest = (endpoint, payload , token = null ) =>
  apiRequest('POST', endpoint, token ,{ data: payload });

// Patch request Function
export const apiPatchRequest = (endpoint, payload , token = null ) =>
  apiRequest('PATCH', endpoint, token , { data: payload });

// Put Request Function
export const apiPutRequest = (endpoint, payload  , token = null ) =>
  apiRequest('PUT', endpoint, token , { data: payload });

// Delete Request Function
export const apiDeleteRequest = (endpoint, payload  , token = null ) =>
  apiRequest('DELETE', endpoint, token, { data: payload });

// Api Request for all the api methods
export const apiRequest = (method, endpoint, token = null , props = {}) => {
  if (!token){
    token = getToken();
  }
  const params = {
    method,
    baseURL: BASE_URL,
    url: endpoint,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key':'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'
    },
  };
  Object.assign(params, props);
  if (token) {
    params.headers.Authorization = `Bearer ${token}`;
  }
  //console.log(JSON.stringify(params))
  return axios(params);
};

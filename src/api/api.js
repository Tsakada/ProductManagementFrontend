import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_END_POINT_DELETE_IMAGE,
  timeout: 1000,
});

export async function deleteFileAPI(value) {
  return await apiClient.post(`/storages/delete-file`, value);
}
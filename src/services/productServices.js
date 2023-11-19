import apiClient from "../components/utils/api-client";

export function getSuggestionsAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}

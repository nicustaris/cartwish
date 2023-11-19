import apiClient from "../components/utils/api-client";

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}

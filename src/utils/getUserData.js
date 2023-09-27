import { apiClient } from "../axios/apiClient";

export const getUserData = async () => {
  try {
    const { data } = await apiClient.get("/users");
    return data;
  } catch (err) {
    console.log("ERROR: ", err);
    return {};
  }
};

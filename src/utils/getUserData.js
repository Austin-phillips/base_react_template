import axios from "axios";

export const getUserData = async (token) => {
  try {
    const { data } = await axios.get("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log("ERROR: ", err);
    return {};
  }
};

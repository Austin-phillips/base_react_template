import axios from "axios";

export const getUserData = async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/users");
    return data;
  } catch (err) {
    console.log("ERROR: ", err);
    return {};
  }
};

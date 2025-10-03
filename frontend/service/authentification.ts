import { getApiUrl } from "@/config";
import { UserCreationData, UserLoginEmail, UserLoginUsername } from "@/types/user/";
import axios from "axios";

export async function signUp(data: UserCreationData) {
  const api = getApiUrl();

  try {
    const response = await axios.post(
      api + "/auth/signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

export async function signIn(data: UserLoginEmail | UserLoginUsername) {
  if ("email" in data) {
    return await loginWithEmail(data);
  } else {
    return await loginWithUsername(data);
  }
}

const loginWithEmail = async (data: UserLoginEmail) => {
  const api = getApiUrl();

  try {
    console.log("API URL:", api);
    const response = await axios.post(
      api + "/auth/email/signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during email login:", error);
    throw error;
  }
};

const loginWithUsername = async (data: UserLoginUsername) => {
  const api = getApiUrl();

  try {
    console.log("API URL:", api);
    const response = await axios.post(
      api + "/auth/username/signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during username login:", error);
    throw error;
  }
};

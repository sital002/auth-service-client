import axios from "axios";
import z from "zod";

const SERVER_URL = "http://localhost:3000";

const loginResponse = z.object({
  access_token: z.string(),
});

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axios.post(`${SERVER_URL}/user/signin`, {
    email,
    password,
  });
  const parsedData = loginResponse.parse(response.data);
  return parsedData;
}

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await axios.post(`${SERVER_URL}/user/signup`, {
    name,
    email,
    password,
  });
  const parsedData = loginResponse.parse(response.data);
  return parsedData;
}

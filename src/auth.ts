import axios, { isAxiosError } from "axios";
import z from "zod";

const SERVER_URL = "http://localhost:3000";

const loginResponse = z.object({
  access_token: z.string(),
});

type SignInInput = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInInput) {
  try {
    const response = await axios.post(`${SERVER_URL}/user/signin`, {
      email,
      password,
    });
    const parsedData = loginResponse.parse(response.data);
    return parsedData;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data);
    }
    if (err instanceof Error) {
      throw err;
    }

    throw new Error("An unknown error occurred during sign in.");
  }
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

type verifyEmailInput = {
  verificationToken: string;
  accessToken: string;
};
export async function verifyEmail({
  verificationToken,
  accessToken,
}: verifyEmailInput) {
  if (!verificationToken) throw new Error("Verification Token is required");
  if (!accessToken) throw new Error("Access Token is missing");
  const response = await axios.post(
    `${SERVER_URL}/user/verify-email?token=${verificationToken}`,
    {},
    {
      headers: {
        "x-access-token": accessToken,
      },
    }
  );
  if (!response.data) throw new Error("Error verifying email");
  return true;
}

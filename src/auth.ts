import axios, { isAxiosError } from "axios";
import z from "zod";
import { AuthSDKError } from "./utils/api-error";

const SERVER_URL = "http://localhost:3000";

const loginResponse = z.object({
  access_token: z.string().min(1, "Access Token is required"),
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

    const parsedData = loginResponse.safeParse(response.data);
    if (!parsedData.success) {
      const tree = z.treeifyError(parsedData.error);
      throw new AuthSDKError("validation", "Invalid API response format", tree);
    }
    return parsedData.data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new AuthSDKError(
        "server",
        err.response?.data || "Server error",
        err.response?.data
      );
    }
    if (err instanceof AuthSDKError) throw err;

    if (err instanceof Error) {
      throw new AuthSDKError("unknown", err.message);
    }
    throw new AuthSDKError(
      "unknown",
      "An unknown error occurred during sign in."
    );
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
  if (!verificationToken)
    throw new AuthSDKError("validation", "Verification Token is required");
  if (!accessToken)
    throw new AuthSDKError("validation", "Access Token is missing");
  try {
    const response = await axios.post(
      `${SERVER_URL}/user/verify-email?token=${verificationToken}`,
      {},
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    if (!response.data)
      throw new AuthSDKError("server", "Error verifying email");
    return true;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new AuthSDKError(
        "server",
        err.response?.data || "Server error",
        err.response?.data
      );
    }
    if (err instanceof AuthSDKError) throw err;
    if (err instanceof Error) {
      throw new AuthSDKError("unknown", err.message);
    }
    throw new AuthSDKError(
      "unknown",
      "An unknown error occurred while verifying email."
    );
  }
}

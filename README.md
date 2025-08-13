# @auth-service/client

 A lightweight TypeScript SDK for interacting with an authentication API.
Includes built-in request validation using zod and consistent error handling with AuthSDKError.

Install the package using npm:

```bash
npm install @auth-service/client
```

Install the package using yarn:

```bash
yarn add @auth-service/client
```

Quick Example:

```ts
import { AuthSDK } from "@auth-service/client";

const auth = AuthSDK({ baseUrl: "http://localhost:3000" });

(async () => {
  try {
    const { access_token } = await auth.signIn({
      email: "john@example.com",
      password: "mypassword123",
    });

    console.log("Access Token:", access_token);
  } catch (error) {
    console.error(error);
  }
})();
```

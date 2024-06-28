"use client";
import { useState } from "react";
import { setCookie } from "../utils/cookies";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grant_type: "http://auth0.com/oauth/grant-type/password-realm",
            username: email,
            password: password,
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
            client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
            scope: "openid email offline_access",
            realm: "Username-Password-Authentication",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setCookie("access_token", data.access_token, {
        path: "/",
        maxAge: 86400,
      });
      setCookie("id_token", data.id_token, { path: "/", maxAge: 86400 });
      push("/dashboard");
    } catch (error: any) {
      setErrorText(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-20">
      <form onSubmit={handleSubmit} className="flex flex-col border p-4 gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:bg-blue-900"
        >
          Login
        </button>
        {errorText && <p className="text-red-500">{errorText}</p>}
      </form>
    </div>
  );
}

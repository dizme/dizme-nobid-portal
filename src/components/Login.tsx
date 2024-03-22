"use client"
import { signIn } from "next-auth/react";
import Button from "./walt/button/Button";

export default function Login() {
  return <Button
    onClick={() => signIn("keycloak")}
    className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
    Signin with PID
  </Button>
}
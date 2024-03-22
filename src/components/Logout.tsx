"use client"
import federatedLogout from "@/utils/federatedLogout";
import Button from "./walt/button/Button";

export default function Logout() {
  return <Button
    onClick={() => federatedLogout()}
    className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
    Sign out
  </Button>
}
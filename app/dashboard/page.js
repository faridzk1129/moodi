import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export const metadata = {
  title: "moodi·dashboard",
};

export default function dashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}

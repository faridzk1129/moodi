import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
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

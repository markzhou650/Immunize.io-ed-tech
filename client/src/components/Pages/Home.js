import React from "react";
import AppProvider from "../../context";
import Container from "../Container";

export default function Home() {
  return (
    <AppProvider>
      <Container />
    </AppProvider>
  );
}

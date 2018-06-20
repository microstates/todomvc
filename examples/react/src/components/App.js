import React from "react";
import State from "@microstates/react";
import TodoMVC from "../models";
import Header from './Header';
import MainSection from './MainSection';

export default function App({ value }) {
  return (
    <State type={TodoMVC} value={value}>
      {model => (
        <div>
          <Header model={model} />
          <MainSection model={model} />
        </div>
      )}
    </State>
  );
}

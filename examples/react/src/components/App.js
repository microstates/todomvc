import React from "react";
import State from "@microstates/react";
import TodoMVC from "../models";
import Header from './Header';
import MainSection from './MainSection';

export default function App({ value, onChange }) {
  return (
    <State type={TodoMVC} value={value} onChange={onChange}>
      {model => (
        <div>
          <Header model={model} />
          <MainSection model={model} />
        </div>
      )}
    </State>
  );
}

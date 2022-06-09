/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";

export default function Dropdown(props) {
 
  const [value, setValue] = useState("html-css");
  const handleChange = (e) => {
    setValue(e.target.value)
    props.onSelect(e.target.value)
  };
  const dataDropdown = [
    {
      value: "html-css",
      name: "HTML and CSS",
    },
    {
      value: "angular",
      name: "Angular Framework",
    },
    {
      value: "react",
      name: "React Framework",
    },
    {
      value: "vue",
      name: "vue Framework",
    },
    {
      value: "nestjs",
      name: "NestJs Framework",
    },
    {
      value: "python",
      name: "Python",
    },
    {
      value: "java",
      name: "Java",
    },
    {
      value: "javascript",
      name: "JavaScript",
    },
    {
      value: "go-lang",
      name: "Golang (Go)",
    },
    {
      value: "c-plus",
      name: "C++",
    },
    {
      value: "c-sharp",
      name: "C#",
    },
  ];
  return (
    <div>
      <select className="form-control" value={value} onChange={handleChange}>
        <>
          {dataDropdown.map((value, index) => {
            return <option key={index} value={value.value}>{value.name}</option>;
          })}
        </>
      </select>
    </div>
  );
}

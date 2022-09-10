import React  from "react";

export default function Header({name}) {
  return (
    <div style={{background:'red'}}> 
        <h1>This is a header component</h1>
        <h1>{name}</h1>
        <p>I want to learn how to make components in react</p>
    </div>
  )
}

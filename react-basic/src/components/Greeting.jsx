/* eslint-disable no-unused-vars */
// const Greeting = ({name,age}) => (
//   <>
//     <h1>Hello {name}</h1>
//     <p>Your age is {age}</p>
//     <p>This is testing </p>
//   </>
// );
// export const color = "green";
// export default Greeting;

import React from "react";

const Greeting = ({ name, age }) => {
  // let inputAge = null;
  // if(age){
  // inputAge = <p> Your Age is {age}</p>

  return (
    <>
      <h1> Hello{name}</h1>
      <p> This is testing</p>
      {age && <p> Your Age is {age}</p>}
    </>
  );
};

export default Greeting;

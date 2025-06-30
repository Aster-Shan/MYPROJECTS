// import React from 'react';

// const TabButton = ({children}) => {
//   return <>
//     {children}
//     <button>Submit</button>
//     {/* can add and call component  */}

//   {/* <button>{children}</button>  only tring */}
//   </>
// };

// export default TabButton

import React from "react";

const TabButton = ({ children,...props }) => {
  return (
    <>
      {children}
      <button {...props}></button>
      {/* <button>Cancel</button> */}
    </>
  );
};

export default TabButton;

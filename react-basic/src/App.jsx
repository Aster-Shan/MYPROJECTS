/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';

function App() {
  //  const [count, setCount] = useState(0)
  // const user = { name: "David", age: 18 };
  // const brands = ["Apple", "Samsung", "Sonny"];

  // const onClickListener= (name) =>{
  //   alert(`Hello ${name}`)

  // };

  // let count = 0;
  // const IncreaseHandler=()=>{
  //   count++;
  //   console.log(count);

  // }

  // const [count,setCount] = useState(0);//state

  //const [user, setUser] = useState({ name: "Thuu", age: 23, isbusy: true });

  const [name,setName] =useState('');
  const [error,setError] = useState('');

  useEffect(()=> {
    if(!name){
      setError("Empty name is not allowed")
    }
    else if(name.trim() === ""){
      setError("Invalid Name")
    }
    else setError("");
  } , [name]);
  
  return (
    <>
    <form action="">
      <label htmlFor="name">Enter Your Name  </label>
      <input type="text" id = "name" onChange={(e)=>setName(e.target.value)}/>
    </form>
    {error && <p>{error}</p>}


      {/* <h1>Hello {user.name}</h1>
      <p> Your age is :{user.age}</p>
      {user.isbusy ? <p>He is now busy</p> : <p>He is now avaliable</p>}
      <button
        onClick={() =>
          setUser((prev) => {
            return { ...prev, isbusy: !user.isbusy };
          })
        }
      >
        Change Status
      </button> */}

      {/* <p>Count : {count}</p>
      <button onClick={()=>setCount(count+1)}>Increase</button> */}

      {/* <Greeting {...user} />

      <TabButon onClick = {() =>onClickListener("Thuu")}>
        <p> Sign Up</p>
      </TabButon>
      {brands.map((brand) => (
        <p key={brand}>{brand}</p>
      ))} */}

      {/* {brands.map((brand)=>(<p>{brand}</p>
    ))} */}
      {/* <Greeting {...user}/>
       <TabButton>
        <p>Sign Up</p>
       </TabButton> */}

      {/* 
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userid,setUserId] = useState("");

  //part of previous state
  const [count,setCount] = useState(0);
  const [prev,setPrev] = useState(0);


  // fetch() return a promis with a result that catched by then()->(then always takes a callback function) after that
  //we have to convert the result to json() and that return a another promis with the responce of json format.

  useEffect(() => { //when website render 
    getUsers(); //    through getUsers() method data retrive frome our fake api db.json
  }, []);

  function getUsers(){ // Here we get the values from db.json (from api actually)
    fetch("http://localhost:3001/users").then((result) => {
      result.json().then((resp) => {
        // console.log(resp);
        setData(resp);
      });
    });
  }

  function addUsers() {   // Here we add new users to db.json (means post to the api using POST Method)
    // console.log(name,email,mob);
    let userdata = { name, email, mobile };
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((result) => {
      result.json().then((resp) => {
        console.log("Responce ", resp);
        getUsers(); //after adding again get the value so that the particular data display on the browser.
      });
    });
  }

  function deleteUser(id){//Here we delete user using method DELETE to db.json or api
    // alert("Delete",id);
    fetch(`http://localhost:3001/users/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp);
        getUsers(); // if we not write this our data has deleted but not display again in the browser
        //After we write it again get the data and render to the browser.
      })
    })
  }

  function setUsers(id){
    data.map((items)=>{
      if(items.id === id){
        setName(items.name);
        setEmail(items.email);
        setMobile(items.mobile);
        setUserId(items.id);
      }
    })
    // console.log(id);
  }

  function updateUser(){
    const item = {name,email,mobile};
    fetch(`http://localhost:3001/users/${userid}`,{
      method:"PUT",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(item)
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp);
        getUsers();
      })
    })
  }

  //part of Previous State
  function updateState(){
    let val = Math.floor(Math.random()*100);
    setCount((previous)=>{ //setCount return a callback function that return the previous state or value
      setPrev(previous);
      return val; // and we have to return that value which you want to set
    })
  }
  //part of Previous State
  function updatebyFive(){
    for(let i=0;i<5;i++){
      // setCount(count+1)//This logic can't increase the count by 5 so be careful
      //instade of doing this when you use for loop and set function of useState then always use a call back 
      //function to set values and value set through "Previous value".
      setCount((previous)=>{
        return previous+1;//This operation gives the right increament.
      })
    }
  }

  return (
    <div className="App">
      <h2>Here are the Information about the Users</h2>
      <div className="container" style={{margin:"40px"}}>
        <table border="1">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Delete Items</th>
              <th>Update Items</th>
            </tr>
            {data.map((items,i) => (
              <tr key={i}>
                <td>{items.id}</td>
                <td>{items.name}</td>
                <td>{items.email}</td>
                <td>{items.mobile}</td>
                <td >
                  <button onClick={()=>{deleteUser(items.id)}} style={{ padding: "5px",backgroundColor:"rgb(239 187 185)",border:"1px solid rgb(99 52 50)" }}>Delete</button>
                </td>
                <td>
                  <button onClick={()=>{setUsers(items.id)}} style={{ padding: "5px",backgroundColor:"rgb(239 235 164)",border:"1px solid rgb(78 76 42)" }}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="set">
          <h2 style={{margin:"5px"}}>Update Users</h2>
          <input onChange={(e)=>{setName(e.target.value)}} style={{padding:"10px",margin:"5px"}} type="text" value={name} />
          <input onChange={(e)=>{setEmail(e.target.value)}} style={{padding:"10px",margin:"5px"}} type="email" value={email} />
          <input onChange={(e)=>{setMobile(e.target.value)}} style={{padding:"10px",margin:"5px"}} type="number" value={mobile} />
          <button onClick={updateUser} style={{padding:"8px",margin:"5px",backgroundColor:"#9cea9c",border:"1px solid #326832"}}>Update User</button>
        </div>
      </div>

      <div className="form">
        <h2>POST API Example</h2>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ padding: "10px", margin: "5px" }}
          type="text"
          placeholder="Enter Name"
        />{" "}
        <br />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ padding: "10px", margin: "5px" }}
          type="email"
          placeholder="Enter Email"
        />
        <input
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          style={{ padding: "10px", margin: "5px" }}
          type="number"
          placeholder="Enter Mobile"
        />{" "}
        <br />
        <button
          onClick={addUsers}
          style={{ padding: "10px", margin: "5px", backgroundColor:"#9cea9c",border:"1px solid #326832" }}
          type="button"
        >
          Add Users
        </button>
      </div>

      <div className="previous">
        <h2>Learn Previous State</h2>
        <p>Previous State : {prev}</p>
        <p>Current State : {count}</p> 
        <button onClick={updateState} style={{margin:"5px",padding:"8px",backgroundColor:"#9cea9c",border:"1px solid #326832"}}>Update State</button>
        <button onClick={updatebyFive} style={{margin:"5px",padding:"8px",backgroundColor:"#9cea9c",border:"1px solid #326832"}}>Increase by 5</button>
      </div>
    </div>
  );
}

export default App;

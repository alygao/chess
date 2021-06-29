import React,{useState} from 'react'
import Button from "@material-ui/core/Button";
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [greetings, setGreetings] = useState([])

  const getGreetings = (name, username, password) => {
    console.log("name = ", name)
    axios.post("http://localhost:8080/v1/player/", {name, username, password}).then((res) => {
      axios.get("http://localhost:8080/v1/player/", {params: {name}}).then((res) => {
        const greetingsData = res.data;
        setGreetings(greetingsData);
        console.log(greetingsData);
      });
    });
  };


  return (
    <div className="App">
      <h1>chess!</h1>
      Enter Name: 
      <input 
          type="text"
          key="random1"
          value={name}
          placeholder="Enter Name Here"
          onChange={(e) => setName(e.target.value)}
      />
      Enter Username: 
      <input 
          type="text"
          key="random2"
          value={username}
          placeholder="Enter Username Here"
          onChange={(e) => setUsername(e.target.value)}
      />
      Enter Password: 
      <input 
          type="text"
          key="random3"
          value={password}
          placeholder="Enter Password Here"
          onChange={(e) => setPassword(e.target.value)}
      />
      <Button
            onClick={() => {
              getGreetings(name, username, password);
            }}
            variant="contained"
            style={{
              backgroundColor: "black",
              borderRadius: 100,
              color: "white",
              textTransform: "none",
            }}
          >
            Enter
          </Button>
        {greetings && 
          <ul>
            {greetings.map((value, index) => {
              return <li key={index}>#{value.id} - Username: {value.username}, Name: {value.name} </li>
            })}
          </ul>
        }
    </div>
  );
}

export default App;

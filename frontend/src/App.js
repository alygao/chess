import React,{useState} from 'react'
import Button from "@material-ui/core/Button";
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("")
  const [greetings, setGreetings] = useState([])

  const getGreetings = (name) => {
    console.log("name = ", name)
    axios.post("http://localhost:8080/v1/greeting/", {name}).then((res) => {
      const greetingsData = res.data;
      setGreetings(greetingsData);
      console.log(greetingsData);
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
      <Button
            onClick={() => {
              getGreetings(name);
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
              return <li key={index}>#{value.id} - Hello, {value.greeting}. The current time is {value.timestamp}</li>
            })}
          </ul>
        }
    </div>
  );
}

export default App;

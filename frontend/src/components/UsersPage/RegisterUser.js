import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./RegisterUser.css"

function RegisterUser() {

    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [inputName, setName] = useState("")

    const handleCreateUser = (e) => {
        e.preventDefault()
        if (!inputName.replace(/\s/g, "").length || !inputName.replace(/\s/g, "").length || !inputName.replace(/\s/g, "").length) {
            alert("Your fields must not only contain whitespaces.");
            return;
        }
        axios.post("http://localhost:8080/v1/player/register", 
                   {"name": inputName, "username": inputUsername, "password":inputPassword}
          ).then((res) => {
            alert("Your account has been successfully created. Please login.")
            setName("");
            setInputUsername("");
            setInputPassword("");
        }).catch((err) => {
            alert("Your username is already taken. Please choose another username.");
        });
    
      }

    return (
        <>
            <h1>New User</h1>
            <p>In order to favourite games, please create a user account.</p>
            <div className="register-user-fields">
                <input type="text" value={inputName} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <input type="text" value={inputUsername} placeholder="Username" onChange={(e) => setInputUsername(e.target.value)}/>
                <input type="password" value={inputPassword} placeholder="Password" onChange={(e) => setInputPassword(e.target.value)}/>
                <div className="register-user-button">
                    <Button
                    onClick={handleCreateUser}
                    variant="contained"
                    style={{
                        backgroundColor: "black",
                        borderRadius: 100,
                        color: "white",
                        textTransform: "none",
                    }}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </>
    )
}

export default RegisterUser;
import "./GeneralPageLayout.css";
import axios from 'axios';

import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import chessIcon from "../images/chess_icon.svg";
import Button from '@material-ui/core/Button'

import GeneralGamesPage from "./GamesPage/GeneralGamesPage";
import OpeningsPage from "./OpeningsPage/OpeningsPage";
import GeneralEventsPage from "./EventsPage/GeneralEvents";
import GeneralUsersPage from "./UsersPage/GeneralUsersPage";

function GeneralPageLayout() {
  const [isGamesPageShown, setGamesPageShown] = useState(true);
  const [isOpeningsPageShown, setOpeningsPageShown] = useState(false);
  const [isEventsPageShown, setEventsPageShown] = useState(false);
  const [isUsersPageShown, setUsersPageShown] = useState(false);

  const [isSingleGameShown, setIsSingleGameShown] = useState(false);
  const [isSingleEvemtShown, setIsSingleEventShown] = useState(false);
  const [defaultValue, setDefaultValue] = useState(-1);
  const [currUsername, setCurrUsername] = useState(null);

  const [inputUsername, setInputUsername] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  

  // const history = useHistory();

  // const goToLandingPage = () => {
  //   history.push("/");
  // };

  // const onLogoutClick = (e) => {
  //   e.preventDefault();
  //   props.logoutUser();
  // };

  // const { user } = props.auth;

  const handleGamesPage = (e) => {
    e.preventDefault();
    setGamesPageShown(true,);
    setOpeningsPageShown(false);
    setEventsPageShown(false);
    setUsersPageShown(false)
    setIsSingleGameShown(false);
    setIsSingleEventShown(false);
    setDefaultValue(-1);
  };

  const handleOpeningsPage = (e) => {
    e.preventDefault();
    setGamesPageShown(false);
    setOpeningsPageShown(true);
    setEventsPageShown(false);
    setUsersPageShown(false)
    setIsSingleGameShown(false);
    setIsSingleEventShown(false);
    setDefaultValue(-1);
  };

  const handleEventsPage = (e) => {
    e.preventDefault();
    setGamesPageShown(false);
    setOpeningsPageShown(false);
    setEventsPageShown(true);
    setUsersPageShown(false)
    setIsSingleGameShown(false);
    setIsSingleEventShown(false);
    setDefaultValue(-1);
  };

  const handleUsersPage = (e) => {
    e.preventDefault();
    setGamesPageShown(false);
    setOpeningsPageShown(false);
    setEventsPageShown(false);
    setUsersPageShown(true)
    setIsSingleGameShown(false);
    setIsSingleEventShown(false);
    setDefaultValue(-1);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/v1/player/login", 
               {"username": inputUsername, "password":inputPassword}
      ).then((res) => {
        setCurrUsername(inputUsername);
    }).catch((err) => {
        alert("Incorrect username or password");
    });

  }

  const logout = (e) => {
    e.preventDefault()
    setCurrUsername(null);
  }

  return (
    <div className="general-page-main-container">
        <div className="general-page-menu-bar">
          <div className="general-page-menu-bar-left">
            <img src={chessIcon} />
            <Link to="/games">
              <li onClick={handleGamesPage}>Games</li>
            </Link>
            <Link to="/openings">
              <li onClick={handleOpeningsPage}>Openings</li>
            </Link>
            <Link to="/events">
              <li onClick={handleEventsPage}>Events</li>
            </Link>
            <Link to="/user">
              <li onClick={handleUsersPage}>Account</li>
            </Link>
          </div>
          {currUsername  === null && <div className="general-page-menu-bar-right">
            <input type="text" value={inputUsername} placeholder="Username" onChange={(e) => setInputUsername(e.target.value)}/>
            <input type="text" value={inputPassword} placeholder="Password" onChange={(e) => setInputPassword(e.target.value)}/>
          
              
            <Button
              onClick={handleLogin}
              variant="contained"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                color: "white",
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </div>}
          {currUsername && <div className="general-page-menu-bar-right">
            <Button
              onClick={logout}
              variant="contained"
              style={{
                backgroundColor: "black",
                borderRadius: 100,
                color: "white",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          </div>}
        </div>
        <div className="general-page-content">
          {isGamesPageShown && <GeneralGamesPage isSingleGameShown={isSingleGameShown} setIsSingleGameShown={setIsSingleGameShown} defaultValue={defaultValue} currUsername={currUsername}/>}
          {isOpeningsPageShown && <OpeningsPage/>}
          {isEventsPageShown && <GeneralEventsPage currUsername={currUsername} isSingleEventShown={isSingleEvemtShown} setIsSingleEventShown={setIsSingleEventShown} isSingleGameShown={isSingleGameShown} setIsSingleGameShown={setIsSingleGameShown} setDefaultValue={setDefaultValue} />}
          {isUsersPageShown && <GeneralUsersPage currUsername={currUsername} isSingleGameShown={isSingleGameShown} setIsSingleGameShown={setIsSingleGameShown}/>}
        </div>
    </div>
  );
}


export default GeneralPageLayout;
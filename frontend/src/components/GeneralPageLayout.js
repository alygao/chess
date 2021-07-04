import "./GeneralPageLayout.css";

import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import chessIcon from "../images/chess_icon.svg";

// Material UI
// import Button from "@material-ui/core/Button";
// import { ThemeProvider } from "@material-ui/core/styles";


import GamesPage from "./GamesPage/GamesPage";
import OpeningsPage from "./OpeningsPage/OpeningsPage";

// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";

function GeneralPageLayout() {
  const [isGamesPageShown, setGamesPageShown] = useState(true);
  const [isOpeningsPageShown, setOpeningsPageShown] = useState(false);
  const [isEventsPageShown, setEventsPageShown] = useState(false);

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
    setGamesPageShown(true);
    setOpeningsPageShown(false);
    setEventsPageShown(false);
  };

  const handleOpeningsPage = (e) => {
    e.preventDefault();
    setGamesPageShown(false);
    setOpeningsPageShown(true);
    setEventsPageShown(false);
  };

  const handleEventsPage = (e) => {
    e.preventDefault();
    setGamesPageShown(false);
    setOpeningsPageShown(false);
    setEventsPageShown(true);
  };

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
          </div>
        </div>
        <div className="general-page-content">
          {isGamesPageShown && <GamesPage/>}
          {isOpeningsPageShown && <OpeningsPage/>}
          {/* {isEventsPageShown && <EventsPage/>} */}
        </div>
    </div>
  );
}


export default GeneralPageLayout;

// EmployeePortalPage.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { logoutUser })(EmployeePortalPage);
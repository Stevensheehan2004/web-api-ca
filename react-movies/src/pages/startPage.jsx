import React from "react";
import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to The Movies Database! View your <Link to="/movies/nowplaying">Movies</Link> or your <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
            </p>
        </>
    );
  };

export default StartPage;

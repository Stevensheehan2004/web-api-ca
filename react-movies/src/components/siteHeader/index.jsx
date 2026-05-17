import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate, Link as RouterLink } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ darkMode, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const { favorites, mustWatch } = useContext(MoviesContext);
  const context = useContext(AuthContext);

  const menuOptions = [
    { label: "Start", path: "/" },
    { label: "Home", path: "/movies/nowPlaying" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Watchlist", path: "/watchlist" },
    { label: "Now Playing", path: "/movies/nowPlaying" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Actors", path: "/actors" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #ff2ec4, #4b0082)",
          color: "white",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
              mr: 2,
              "&:hover": { opacity: 0.8 },
            }}
          >
            TMDB Client
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <div style={{ display: "flex", flexGrow: 1, flexWrap: "nowrap", overflow: "hidden" }}>
              {menuOptions.map((opt) => {
                let count = 0;
                if (opt.label === "Favorites") count = favorites.length;
                if (opt.label === "Watchlist") count = mustWatch.length;
                return (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ fontSize: "0.75rem", px: 1 }}
                  >
                    <Badge badgeContent={count} color="error">
                      {opt.label}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", gap: "8px" }}>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleDarkMode} color="default" />}
              label="Dark"
              sx={{ mr: 1 }}
            />
            {context.isAuthenticated ? (
  <>
    <Typography variant="body2" sx={{ mr: 1 }}>
      Welcome {context.userName}!
    </Typography>
    <Button color="inherit" size="small" onClick={() => navigate("/profile")}>Profile</Button>
    <Button color="inherit" size="small" onClick={() => context.signout()}>Sign Out</Button>
  </>
) : (
  <>
    <Typography variant="body2" sx={{ mr: 1 }}>
      You are not logged in
    </Typography>
    <Button color="inherit" size="small" onClick={() => navigate("/login")}>Login</Button>
    <Button color="inherit" size="small" onClick={() => navigate("/signup")}>Signup</Button>
  </>
)}
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
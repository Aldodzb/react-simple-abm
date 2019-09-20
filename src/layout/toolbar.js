import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    width: "20px"
  },
  login: {
    position: "relative",
    float: "right",
    marginLeft: "35vw"
  }
}));

export default function ToolbarLay() {
  const classes = useStyles();

  function handleProfileMenuOpen(event) {}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to={"/"}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <MenuItem
            onClick={handleProfileMenuOpen}
            component={Link}
            to={"/administrator"}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <PeopleIcon />
            </IconButton>
            <p>ABM Urban Administrators</p>
          </MenuItem>
          <MenuItem
            onClick={handleProfileMenuOpen}
            component={Link}
            to={"/Company"}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <PersonAddIcon />
            </IconButton>
            <p>ABM Companies</p>
          </MenuItem>
          <MenuItem
            onClick={handleProfileMenuOpen}
            component={Link}
            to={"/reports"}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <EqualizerIcon />
            </IconButton>
            <p>Reports</p>
          </MenuItem>
          <Button color="inherit" className={classes.login}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

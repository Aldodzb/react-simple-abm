import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-center",
    width: "200px",
    marginTop: "20px"
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    marginBottom: "70px"
  },
  table: {
    minWidth: 650
  }
}));

const UserForm = ({
  userData: userDataProp,
  addButton = false,
  modButton = false,
  deleteButton = false,
  onActions
}) => {
  const classes = useStyles();
  const [tempUser, setTempUser] = useState(userDataProp);
  const [userData2, setUserData2] = useState(userDataProp);
  const handleSubmit = event => {
    event.preventDefault();
    /*axios
      .post(`https://localhost:44365/api/values`, {
        username: values.username,
        password: values.password
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });*/
    //rows.push({ username: "asdas", password: "asd" });
    //setRows(rows => [values, ...rows]);
  };

  React.useEffect(() => {
    setTempUser(userDataProp);
    setUserData2(userDataProp);
  }, [userDataProp]);

  function handleAdd() {
    onActions.handleAdd(userData2);
  }
  function handleModify() {
    onActions.handleModify(tempUser.username, userData2);
  }
  function handleDelete() {
    onActions.handleDelete(userData2);
  }

  const handleChange = name => event => {
    setUserData2({ ...userData2, [name]: event.target.value });
  };

  return (
    <form
      className={classes.container}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-name"
        label="Username"
        className={classes.textField}
        value={userData2.username}
        onChange={handleChange("username")} //(userData.username = tempUser.username)}
        margin="normal"
      />
      <TextField
        id="standard-name"
        label="Password"
        className={classes.textField}
        value={userData2.password}
        onChange={handleChange("password")}
        margin="normal"
      />
      {addButton ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAdd}
          type="button"
        >
          Add new User
        </Button>
      ) : null}
      {modButton ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleModify}
          type="button"
        >
          Modify User
        </Button>
      ) : null}
      {deleteButton ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleDelete}
          type="button"
        >
          Delete User
        </Button>
      ) : null}
    </form>
  );
};

UserForm.propTypes = {
  // bla: PropTypes.string,
};

UserForm.defaultProps = {
  // bla: 'test',
};

export default UserForm;

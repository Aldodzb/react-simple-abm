import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CustomDialog from "../Dialog/CustomDialog/CustomDialog";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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

const Administrator = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });

  const [rows, setRows] = useState([]);
  const [toggleModifyDialog, setToggleModifyDialog] = useState(false);
  const [dialogUsername, setDialogUsername] = useState("");
  const [dialogPassword, setDialogPassword] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = name => event => {
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`https://localhost:44365/api/values`, {
        username: values.username,
        password: values.password
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    //rows.push({ username: "asdas", password: "asd" });
    setRows(rows => [values, ...rows]);
  };

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  useEffect(() => {
    // code to run on component mount
    refreshUsersTable();
  }, []);

  function handleDialogClose(newValue) {
    setOpenDialog(false);
  }

  function handleAdd(userData) {
    axios
      .post(`https://localhost:44365/api/values`, {
        username: userData.username,
        password: userData.password
      })
      .then(res => {
        refreshUsersTable();
      });
  }

  function handleModify(username, userData) {
    axios
      .put(`https://localhost:44365/api/values/` + username, {
        username: userData.username,
        password: userData.password
      })
      .then(res => {
        refreshUsersTable();
      });
  }

  function handleDelete(userData) {
    axios
      .delete(`https://localhost:44365/api/values/` + userData.username, {
        username: userData.username
      })
      .then(res => {
        refreshUsersTable();
      });
  }

  function openDialog2(row) {
    //setDialogUsername(row.username);
    setDialogPassword(row.password);
    setOpenDialog(true);
  }

  function refreshUsersTable() {
    axios
      .get(`https://localhost:44365/api/values`, defaultOptions)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setRows(res.data);
      });
  }

  return (
    <div className="AdministratorWrapper">
      <CustomDialog
        state={openDialog}
        username={dialogUsername}
        password={dialogPassword}
        onClose={handleDialogClose}
        formUser={{ username: dialogUsername, password: dialogPassword }}
        handleOperations={{ handleAdd, handleModify, handleDelete }}
        isUser={true}
        keepMounted
      ></CustomDialog>
      <Typography
        variant="h5"
        gutterBottom
        style={{ marginTop: "20px", marginLeft: "33%" }}
      >
        Add a new Administrator in UrbanMove
      </Typography>
      <Container maxWidth="xs">
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-name"
            label="Username"
            className={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Add new User
          </Button>
        </form>
      </Container>
      {/* View */}
      <Container
        maxWidth="lg"
        style={{ marginTop: "20px", marginBottom: "40px" }}
      >
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell
                    onClick={() => {
                      console.log(row.username);
                      setDialogUsername(row.username);
                      setDialogPassword(row.password);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.username}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDialogUsername(row.username);
                      setDialogPassword(row.password);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.password}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => {
                        handleDelete({ username: row.username });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
};

Administrator.propTypes = {
  // bla: PropTypes.string,
};

Administrator.defaultProps = {
  // bla: 'test',
};

export default Administrator;

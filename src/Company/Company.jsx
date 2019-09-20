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

const Company = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    Rut: "",
    Name: "",
    Commission: "",
    PercentageCommission: ""
  });

  const [rows, setRows] = useState([]);
  const [toggleModifyDialog, setToggleModifyDialog] = useState(false);
  const [dialogRut, setDialogRut] = useState("");
  const [dialogName, setDialogName] = useState("");
  const [dialogCommission, setDialogCommission] = useState("");
  const [dialogPercentageCommission, setDialogPercentageCommission] = useState(
    ""
  );
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = name => event => {
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`https://localhost:44365/api/Company`, {
        Rut: values.rut,
        Name: values.name,
        Commission: values.commission,
        PercentageCommission: values.percentageCommission
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
      .post(`https://localhost:44365/api/Company`, {
        Rut: userData.rut,
        Name: userData.name,
        Commission: userData.commission,
        PercentageCommission: userData.percentageCommission
      })
      .then(res => {
        refreshUsersTable();
      });
  }

  function handleModify(rut, userData) {
    axios
      .put(`https://localhost:44365/api/Company/` + rut, {
        rut: userData.rut,
        name: userData.name,
        commission: userData.commission,
        percentageCommission: userData.percentageCommission
      })
      .then(res => {
        refreshUsersTable();
      });
  }

  function handleDelete(userData) {
    axios
      .delete(`https://localhost:44365/api/Company/` + userData.rut)
      .then(res => {
        refreshUsersTable();
      });
  }

  function openDialog2(row) {
    //setDialogUsername(row.username);
    //setDialogPassword(row.password);
    setOpenDialog(true);
  }

  function refreshUsersTable() {
    axios
      .get(`https://localhost:44365/api/Company`, defaultOptions)
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
        onClose={handleDialogClose}
        formUser={{
          rut: dialogRut,
          name: dialogName,
          commission: dialogCommission,
          percentageCommission: dialogPercentageCommission
        }}
        handleOperations={{ handleAdd, handleModify, handleDelete }}
        isUser={false}
        keepMounted
      ></CustomDialog>
      <Container maxWidth="xs">
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Add a new Company
        </Typography>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-name"
            label="Rut"
            className={classes.textField}
            value={values.rut}
            onChange={handleChange("rut")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Commission"
            className={classes.textField}
            value={values.commission}
            onChange={handleChange("commission")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="PercentageCommission"
            className={classes.textField}
            value={values.percentageCommission}
            onChange={handleChange("percentageCommission")}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Add new Company
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
                <TableCell>Rut</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Commission Percentage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell
                    onClick={() => {
                      setDialogRut(row.rut);
                      setDialogName(row.name);
                      setDialogCommission(row.commission);
                      setDialogPercentageCommission(row.percentageCommission);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.rut}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDialogRut(row.rut);
                      setDialogName(row.name);
                      setDialogCommission(row.commission);
                      setDialogPercentageCommission(row.percentageCommission);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDialogRut(row.rut);
                      setDialogName(row.name);
                      setDialogCommission(row.commission);
                      setDialogPercentageCommission(row.percentageCommission);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.commission}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setDialogRut(row.rut);
                      setDialogName(row.name);
                      setDialogCommission(row.commission);
                      setDialogPercentageCommission(row.percentageCommission);
                      setTimeout(() => setOpenDialog(true), 0);
                    }}
                  >
                    {row.percentageCommission}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => {
                        handleDelete({ rut: row.rut });
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

Company.propTypes = {
  // bla: PropTypes.string,
};

Company.defaultProps = {
  // bla: 'test',
};

export default Company;

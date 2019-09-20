import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";

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

const Reports = props => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // code to run on component mount
    refreshUsersTable();
  }, []);

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  function refreshUsersTable() {
    axios
      .get(`https://localhost:44365/api/Company`, defaultOptions)
      .then(res => {
        setRows(res.data);
      });
  }

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Companies
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rut</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Commission Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell>{row.rut}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.commission}</TableCell>
                  <TableCell>{row.percentageCommission}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={refreshUsersTable}
        >
          <CachedIcon />{" "}
          <Typography style={{ marginLeft: "8px" }}> Refresh</Typography>
        </Button>
      </Container>
    </div>
  );
};

Reports.propTypes = {
  // bla: PropTypes.string,
};

Reports.defaultProps = {
  // bla: 'test',
};

export default Reports;

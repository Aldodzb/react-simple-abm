import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import UserForm from "../UserForm/UserForm";
import CompanyForm from "../CompanyForm/CompanyForm";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const CustomDialog = props => {
  const classes = useStyles();
  const {
    state,
    onClose,
    formUser: valueProp,
    handleOperations,
    isUser
  } = props;
  const [formUser, setFormUser] = React.useState(valueProp);

  React.useEffect(() => {
    if (!state) {
      setFormUser(valueProp);
    }
  }, [valueProp, state]);

  function handleCancel() {
    onClose();
  }

  function handleOk() {
    onClose();
  }

  function handleChange(event) {
    //setValue(event.target.value);
  }

  return (
    <div>
      <Dialog
        open={state}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Modify User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {isUser ? (
              <UserForm
                userData={formUser}
                modButton={true}
                onActions={handleOperations}
              ></UserForm>
            ) : (
              <CompanyForm
                userData={formUser}
                modButton={true}
                onActions={handleOperations}
              ></CompanyForm>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CustomDialog.propTypes = {
  // bla: PropTypes.string,
};

CustomDialog.defaultProps = {
  // bla: 'test',
};

export default CustomDialog;

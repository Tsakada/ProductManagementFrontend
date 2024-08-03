import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//Srcs
import "./alertmessage.scss";
import { AuthContext } from "../../context/AuthContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function AlertMessageNew() {
  const { alert, setAlert, language } = useContext(AuthContext);

  let open = alert()?.open;
  let message = alert()?.message;
  let status = alert()?.status;

  // console.log("status::", status)

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") { return; }
    setAlert(false, "", "");
  };

  return (
    <div className="alert-message">
      {status === "success" ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          className="snackbar-alert"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={handleCloseAlert}
            className={"alert-success"}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}

      {status === "error" ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          className="snackbar-alert"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            className={"alert-error"}
            onClose={handleCloseAlert}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

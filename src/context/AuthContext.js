import React, { useReducer, createContext, useState } from "react";

// reducer
const globalITReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
  // ==================== user login state ===================================
  const [state, dispatch] = useReducer(globalITReducer, initialState);

  const [role, setRole] = useState("");

  React.useEffect(() => {
    async function getRoleFromStorage() {
      let userRole = await JSON.parse(window.localStorage.getItem("role"));

      if (userRole) {
        setRole(userRole);
        return;
      }
    }

    setTimeout(() => {
      getRoleFromStorage();
    }, 1000);
  }, [role]);

  // =============================== Check role and Permissions =============================
  const noneUserAccesse = (roles) => {
    const getRole = roles.filter((rol) => rol === role);
    if (getRole.length > 0) return true;
    else return false;
  };

  // ========================= Alert Message ===========================
  const [open, setOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const setAlert = (open, alert, message) => {
    setOpen(open);
    setAlertStatus(alert);
    setMessageAlert(message);
  };

  const alert = () => {   return { open: open, status: alertStatus, message: messageAlert };  };

  // =================  change language =======================================
  const [language, setLanguage] = useState("en");
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  //============================= return ===========================
  const value = {
    role,
    alert,
    state,
    setRole,
    dispatch,
    setAlert,
    language,
    changeLanguage,
    noneUserAccesse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };

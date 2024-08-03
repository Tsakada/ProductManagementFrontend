import * as React from "react";
import Router from "./routes";
import "./Style/styeReport.css";
import "./Style/stylePayslip.css";
import "./Style/styleDocumentForm.css";

import { BrowserRouter as Routers } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
// Connect Aplolo Client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GlobalDebug } from "./Function/RemoveConsole";
import AlertMessageNew from "./Component/AlertMessage/AlertMessageNew";

function App() {
  // ====================== set token =======================
  const [token, setToken] = React.useState(
    window.localStorage.getItem("token")
  );

  const httpLink = createHttpLink({
    // uri: process.env.REACT_APP_END_POINT,
    uri: "http://localhost:2015/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: "#f8f8f8",
          },
        },
        typography: {
          fontFamily: ["Siemreap"].join(","),
        },
      }),
    []
  );

  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routers>
            <Router />
          </Routers>
          <CssBaseline />
        </ThemeProvider>
      </QueryClientProvider>
      <AlertMessageNew />
    </ApolloProvider>
  );
}

export default App;

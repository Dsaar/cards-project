import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Layout from "./layout/Layout";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import UserProvider from "./users/providers/UserProvider";


function App() {


  return (
    <>
    <UserProvider>
      <CustomThemeProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </CustomThemeProvider>
      </UserProvider>


    </>
  );
}

export default App;
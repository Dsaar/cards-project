import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
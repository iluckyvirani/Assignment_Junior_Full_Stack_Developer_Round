/** @format */
import { ReactNotifications } from "react-notifications-component";
import { Routes, Route } from "react-router-dom";
import routes from "./Routes/routes";

function App() {
  
  return (
    <>
      <ReactNotifications />
      <Routes>
        {routes.map((i) => (
          <Route path={i.path} key={i.path} element={i.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;

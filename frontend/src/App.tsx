import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/index";
import "./App.css";
import { routes } from "./routes";
import Navbar from "./components/Navbar";
import VNavbar from "./components/VNavbar";

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Provider store={store}>
        
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <VNavbar />
          {element}
        </PersistGate>
      </Provider>
      
    </>
    
  );
}

export default App;

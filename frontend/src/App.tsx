import React , {useState} from "react";
import { PersistGate } from "redux-persist/integration/react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/index";
import "./App.css";
import { routes } from "./routes";
import Navbar from "./components/Navbar";
import VNavbar from "./components/VNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showvNavbar, setShowvNavbar] = useState(false);
  const handleShowvNavbar = () => {
    setShowvNavbar(!showvNavbar);
  };
  const element = useRoutes(routes);
  return (
    <>
      <Provider store={store}>
        
        <PersistGate loading={null} persistor={persistor}>
          <Navbar handleShowvNavbar={handleShowvNavbar} />
          <VNavbar handleShowvNavbar={handleShowvNavbar}
            showvNavbar={showvNavbar} />
          <ToastContainer />
          {element}
        </PersistGate>
      </Provider>
      
    </>
    
  );
}

export default App;

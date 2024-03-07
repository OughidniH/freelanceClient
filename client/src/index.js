import { createRoot } from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./Redux/store/store";
createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <BrowserRouter>
     <Provider store = {store}>
       <App />
     </Provider>
    </BrowserRouter>
  </ContextProvider>
);

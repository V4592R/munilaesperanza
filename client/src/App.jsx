/* App */
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

import "./App.css";
import moment from "moment";
import 'moment/dist/locale/es';
moment.locale("es");

function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRoutes />
                </PersistGate>
            </Provider>
        </HashRouter>
    );
}

export default App;

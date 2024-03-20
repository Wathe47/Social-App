import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; 

const userFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk),
    preloadedState: {
        auth: {
            user: userFromLocalStorage,
        }
    },
})

export default store;
import React from "react";
import {createContext, useReducer} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import AddMedPage from "./pages/addMedPage";
import MedDashboard from "./pages/MedDashboard";
import Status from "./pages/statusPage";
import Navbar from "./components/navbar";
import NavbarMedical from "./components/navbarmedical";
import Home from "./pages/homePage";
import LoginDoctor from "./pages/LoginDoctor";
import LoginMedical from "./pages/LoginMedical";
import Consent from './pages/consentPage';
import PrescriptionPage from "./pages/prescriptionPage";
import Logout from "./pages/Logout";
import {initialState, reducer} from "../src/reducer/UseReducer";
import {loggedinmedical} from "../src/reducer/UseReducer";

export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer,initialState);
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    {loggedinmedical ? <NavbarMedical /> : <Navbar />}
    <Routes>
        <Route default path='/' element={<Home />} />  
        <Route path='/logindoctor' element={<LoginDoctor />} /> 
        <Route path='/loginmedical' element={<LoginMedical />} />
        <Route path='/meddashboard' element={<MedDashboard />} />
        <Route path='/addmed' element={<AddMedPage />} />
        <Route path='/status' element={<Status />} />
        {/* <Route path='/consent' element={<Consent />} /> */}
        <Route path='/consent/:id' element={<Consent />} />
        <Route path='/prescriptionpage' element={<PrescriptionPage />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;

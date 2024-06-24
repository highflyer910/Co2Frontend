import { useMain } from "./contexts/MainContext";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EstimatedEmissions from "./pages/EstimatedEmissions";
import PlantTree from "./pages/PlantTree";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import DonationCallback from "./pages/DonationCallback";
import Groups from "./pages/Groups";

function RouterCustom() {
  const { isAuth, userId } = useMain() || {};
  const [realAuth, setRealAuth] = useState(false);

  useEffect(() => {
    setRealAuth(isAuth && userId !== -1);
  }, [isAuth, userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="landingPage" />} />
        {/* Rotte protette per utenti autenticati */}
        <Route
          path="/groups"
          element={realAuth ? <Groups /> : <Navigate to="/" />}
        />

        <Route
          path="/estimatedemissions"
          element={realAuth ? <EstimatedEmissions /> : <Navigate to="/" />}
        />

        <Route
          path="planttree"
          element={realAuth ? <PlantTree /> : <Navigate to="/" />}
        />

        <Route
          path="donate"
          element={realAuth ? <Donate /> : <Navigate to="/" />}
        />

        <Route
          path="donatecallback"
          element={realAuth ? <DonationCallback /> : <Navigate to="/" />}
        />

        {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}
        <Route
          path="landingPage"
          element={!realAuth ? <LandingPage /> : <Navigate to="/groups" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterCustom;

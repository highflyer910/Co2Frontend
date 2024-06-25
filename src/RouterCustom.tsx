import { useMain } from "./contexts/MainContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EstimatedEmissions from "./pages/EstimatedEmissions";
import PlantTree from "./pages/PlantTree";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import DonationCallback from "./pages/DonationCallback";
import Groups from "./pages/Groups";

function RouterCustom() {
  const { jwt } = useMain();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="landingPage" />} />

        {/* Rotte protette per utenti autenticati */}
        <Route
          path="/groups"
          element={jwt ? <Groups /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/estimatedemissions"
          element={
            jwt ? <EstimatedEmissions /> : <Navigate to="/landingPage" />
          }
        />
        <Route
          path="/planttree"
          element={jwt ? <PlantTree /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/donate/:groupId/:groupName"
          element={jwt ? <Donate /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/donate/callback/:context?/:don_status?"
          element={jwt ? <DonationCallback /> : <Navigate to="/landingPage" />}
        />

        {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}
        <Route
          path="/landingPage"
          element={!jwt ? <LandingPage /> : <Navigate to="/groups" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterCustom;

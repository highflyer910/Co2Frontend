import { useMain } from "./contexts/MainContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EstimatedEmissions from "./pages/EstimatedEmissions";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import DonationCallback from "./pages/DonationCallback";
import Groups from "./pages/Groups";
import Limit from "./pages/LimitPage";
import PickGroupPage from "./pages/PickGroupPage"; 

function RouterCustom() {
  const { jwt } = useMain();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="landingPage" />} />

        {/* Protected routes for authenticated users */}
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
          path="/limit/:groupId/:groupName/:groupLimits"
          element={jwt ? <Limit /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/donate/:groupId/:groupName"
          element={jwt ? <Donate /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/donate/callback"
          element={jwt ? <DonationCallback /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/pick-group"
          element={jwt ? <PickGroupPage /> : <Navigate to="/landingPage" />}
        />

        {/* Public routes accessible only to unauthenticated users */}
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

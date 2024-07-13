import { useMain } from "./contexts/MainContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EstimatedEmissions from "./pages/EstimatedEmissions";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import DonationCallback from "./pages/DonationCallback";
import Groups from "./pages/Groups";
import Limit from "./pages/LimitPage";
import GroupDetails from "./pages/GroupDetails"; // Import the new GroupDetails component
import DonationSuccess from "./pages/DonationSuccess"; // Import the DonationSuccess component
import DonationError from "./pages/DonationError"; // Import the DonationError component

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
          path="/group/:groupId"
          element={jwt ? <GroupDetails /> : <Navigate to="/landingPage" />}
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
          path="/donate/success"
          element={jwt ? <DonationSuccess /> : <Navigate to="/landingPage" />}
        />
        <Route
          path="/donate/error"
          element={jwt ? <DonationError /> : <Navigate to="/landingPage" />}
        />

        {/* Public routes accessible only to non-authenticated users */}
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

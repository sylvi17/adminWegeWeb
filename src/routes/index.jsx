import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage        from "../pages/auth/LoginPage";
import UnauthorizedPage from "../pages/auth/UnauthroizedPage";
import DashboardPage    from "../pages/dashboard/DashboardPage";
import SantriPage       from "../pages/santri/SantriPage";
import DetailSantri     from "../pages/santri/DetailSantri";
import PengajarPage     from "../pages/pengajar/PengajarPage";
import LaporanPage      from "../pages/laporan/LaporanPage";
import WaliPage         from "../pages/wali/WaliPage";
import DetailWali       from "../pages/wali/DetailWali";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/",             element: <LoginPage /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },

      {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
      },
      {
        path: "/santri",
        element: <ProtectedRoute><SantriPage /></ProtectedRoute>,
      },
      {
        path: "/santri/:id",
        element: <ProtectedRoute><DetailSantri /></ProtectedRoute>,
      },
      {
        path: "/laporan",
        element: <ProtectedRoute><LaporanPage /></ProtectedRoute>,
      },
      {
        path: "/pengajar",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <PengajarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wali-murid",
        element: <ProtectedRoute><WaliPage /></ProtectedRoute>,
      },
      {
        path: "/wali-murid/:id",
        element: <ProtectedRoute><DetailWali /></ProtectedRoute>,
      },
    ],
  },
]);

export default router;
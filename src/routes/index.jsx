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
 
const router = createBrowserRouter([
  {
    element: <RootLayout />, // AuthProvider ada di sini, wraps semua route
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
    ],
  },
]);
 
export default router;
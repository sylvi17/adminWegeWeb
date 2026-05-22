import { createBrowserRouter } from "react-router-dom";
import LoginPage     from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SantriPage    from "../pages/santri/SantriPage";
import DetailSantri  from "../pages/santri/DetailSantri";
import PengajarPage  from "../pages/pengajar/PengajarPage";
import LaporanPage   from "../pages/laporan/LaporanPage";

const router = createBrowserRouter([
  { path: "/",           element: <LoginPage />     },
  { path: "/dashboard",  element: <DashboardPage /> },
  { path: "/santri",     element: <SantriPage />    },
  { path: "/santri/:id", element: <DetailSantri />  },
  { path: "/pengajar",   element: <PengajarPage />  },
  { path: "/laporan",    element: <LaporanPage />   },
]);

export default router;
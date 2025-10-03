import { createBrowserRouter, RouterProvider } from "react-router";
import Login from './components/Login.jsx';
import Dashboard from './components/UserDashboard.jsx';
import MainPage1 from './components/MainPage1.jsx';
import CropPlanting from './components/CropPlanting.jsx';
import DiseasePrevention from './components/DiseasePrevention.jsx';
import PestControl from './components/PestControl.jsx';
import FertilizerIrrigation from './components/FertilizerIrrigation.jsx';
import NotFound from './components/NotFound.jsx';

// Very small runtime guard using localStorage
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  if (!isAuthenticated) {
    window.location.href = '/';
    return null;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
   {
    path: "/mainpage",
    element: (
      <ProtectedRoute>
        <MainPage1 />
      </ProtectedRoute>
    )
  },
  {
    path: "/crop-planting",
    element: (
      <ProtectedRoute>
        <CropPlanting />
      </ProtectedRoute>
    )
  },
  {
    path: "/disease-prevention",
    element: (
      <ProtectedRoute>
        <DiseasePrevention />
      </ProtectedRoute>
    )
  },
  {
    path: "/pest-control",
    element: (
      <ProtectedRoute>
        <PestControl />
      </ProtectedRoute>
    )
  },
  {
    path: "/fertilizer-irrigation",
    element: (
      <ProtectedRoute>
        <FertilizerIrrigation />
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


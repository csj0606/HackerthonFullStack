import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/Homepage";
import InfoCheckPage from "./pages/InfoCheckPage";
import PatientForm from "./pages/CreateNewInfoPage";
import AntibioticForm from "./pages/CreateAntiBioticInfoPage";
import CreateTestResult from "./pages/CreateTestResultPage";
import SimulatePage1 from "./pages/SimulatePage_1";
import SimulatePage2 from "./pages/SimulatePage_2";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "checkInfo",
        element: <InfoCheckPage />,
      },
      {
        path: "createNew/Info",
        element: <PatientForm />,
      },
      {
        path: "createNew/antibiotics",
        element: <AntibioticForm />,
      },
      {
        path: "/createNew/test_result",
        element: <CreateTestResult />,
      },
      {
        path: "/SimulatePage_1/:patientId",
        element: <SimulatePage1 />,
      },
      {
        path: "/SimulatePage_2/:patientId",
        element: <SimulatePage2 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

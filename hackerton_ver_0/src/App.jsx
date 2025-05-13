import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/HomePage";
import InfoCheckPage from "./pages/InfoCheckPage";
import PatientForm from "./pages/CreateNewInfoPage";
import AntibioticForm from "./pages/CreateAntiBioticInfoPage";
import CreateTestResult from "./pages/CreateTestResultPage";
import SimulatePage1 from "./pages/SimulatePage_1";
import OutputPage from "./pages/OutputPage";
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
        path: "/output/:patientId",
        element: <OutputPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

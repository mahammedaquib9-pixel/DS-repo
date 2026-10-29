import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Modules from "./pages/Modules";
import ModuleDetails from "./pages/ModuleDetails";
import Experiments from "./pages/Experiments";
import ExperimentDetails from "./pages/ExperimentDetails";
import ExperimentOverview from "./pages/ExperimentOverview";
import SubExperiment from "./pages/SubExperiment";
import Tools from "./pages/Tools";
import ToolDetails from "./pages/ToolDetails";
import MaterialViewer from "./pages/MaterialViewer";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId" element={<ModuleDetails />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/:experimentId" element={<ExperimentDetails />} />
          <Route path="/experiments/:experimentId/overview" element={<ExperimentOverview />} />
          <Route path="/experiments/:experimentId/:subExperimentId" element={<SubExperiment />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolId" element={<ToolDetails />} />
          <Route path="/materials/:materialId" element={<MaterialViewer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

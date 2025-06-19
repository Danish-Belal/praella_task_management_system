import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectApp } from "./components/ProjectApp";
import { ToastProvider } from "./components/hooks/use-toast";

const App = () => (
  <ToastProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectApp />} />
      </Routes>
    </BrowserRouter>
  </ToastProvider>
);

export default App;

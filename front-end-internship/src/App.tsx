
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { InternList } from './pages/InternList';
import { EditIntern } from './pages/EditIntern';
import AddIntern from "./pages/AddIntern";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<InternList />} />
          <Route path="/addIntern" element={<AddIntern />} />
          <Route path="/interns/:id" element={<EditIntern />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

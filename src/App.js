
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Detail from "./pages/detail/Detail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/vehicles" element={<List />}/>
        <Route path="/vehicle/:id" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

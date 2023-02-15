import Header from "./Header";
import Card from "./Card";
import ChooseSlot from "./ChooseSlot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./Container";
import Occupied from "./Occupied";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<Container />} />
        <Route path='/choose-slot' exact element={<ChooseSlot />} />
        <Route path='/parking-list' exact element={<Card />} />
        <Route path='/occupied' exact element={<Occupied />} />
      </Routes>
    </Router>
  )
}

export default App;

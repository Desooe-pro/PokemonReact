import './styles/App.css';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {BrowserRouter, Route, Routes} from "react-router-dom";
// npm install react-router-dom

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
            {/*Gestion des pages non trouvées*/}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

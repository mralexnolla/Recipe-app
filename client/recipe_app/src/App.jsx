import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import CreateRecipe from "./pages/CreateRecipe"
import SaveRecipe from "./pages/SaveRecipe"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/auth" element={<Auth />}/>
              <Route path="/create-recipe" element={<CreateRecipe />}/>
              <Route path="/save-recipes" element={<SaveRecipe />}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

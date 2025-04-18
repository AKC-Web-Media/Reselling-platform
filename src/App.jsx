import { BrowserRouter, Route, Routes } from "react-router-dom"
import Appshell from "./pages/Appshell"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Appshell/>} />
      </Routes>
    </BrowserRouter>
  )
}
import Navbar from "./Components/Navbar";
import {useState} from 'react'
function App() {
  const [Mode,changeMode] = useState('dark');
  const toggle = () => {
    changeMode((prev) => {return prev === 'dark'?'light':'dark'})
  }
  const backgroundStyle = {backgroundColor: Mode === 'dark'?'#16213E':'#FDFAF6'}
  return (
  <>
  <div className="h-screen" style={backgroundStyle}>
    <Navbar Mode = {Mode} changeMode = {toggle}/>
  </div>  
  </>     
  );
}

export default App;

import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import {useState} from 'react'
function App() {
  const [Mode,changeMode] = useState('dark');
  const toggle = () => {
    changeMode((prev) => {return prev === 'dark'?'light':'dark'})
  }
  const backgroundStyle = {backgroundColor: Mode === 'dark'?'#16213E':'#FDFAF6'}
  return (
  <>
  <div className="h-screen grid grid-rows-[100px_853px]" style={backgroundStyle}>
    <Navbar Mode = {Mode} changeMode = {toggle}/>
    <Main></Main>
  </div>  
  </>     
  );
}

export default App;

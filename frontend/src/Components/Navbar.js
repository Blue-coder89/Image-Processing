import "../Styles/Navbar.scss";
export default function Navbar(props) {
    const {Mode , changeMode} = props;
    const navStyle = {backgroundColor : Mode === 'dark'?'#1A1A2E':'#FAF1E6'}
    const textStyle = {color:Mode === 'dark'?'#FFFFFF':'#1A1A2E' }
  return (
    <nav className=" h-[100px] flex flex-wrap justify-between p-[20px]" style={navStyle}>
      <h1 className="text-[50px] font-display" style = {textStyle}>EDIT</h1>
        <div className = "flex justify-evenly items-center w-[200px] ">
        <h5 style = {textStyle}>Dark</h5>
        <div className="form-check Switch">
        <input
          className="Toggle scale-[1.5]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={() => {
              changeMode();
          }}
          checked = {Mode === 'light'}
          />
      </div>
          <h5 style = {textStyle}>Light</h5>
        </div>
    </nav>
  );
}

import "../Styles/Option.scss"
export default function Option(props) {
  return (
    <>
      <div className="border-1 sm:border-[#fff] flex justify-center items-center">
        <button
          type="button"
          className="opt opt-primary h-[60%] w-[70%] scale-[1.2]"
          onClick = {() => {
            props.handleClick(props.name);
          }}
        >
          {props.name}
        </button>
      </div>
    </>
  );
}

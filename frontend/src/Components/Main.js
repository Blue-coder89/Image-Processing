import Option from "./Option";
export default function Main(){
    let arr = ["Original","Black and White","Negative","Brightness Increase","Brightness Decrease","Threshold"];
    const OptionGroup = arr.map((option) => <Option name = {option} key = {option} handleClick = {handleOptionClick}/>)
    function handleOptionClick(id) // handle if the option is clicked
        {
            console.log(id);
        }
    return (
    <>
    <div className="flex sm:justify-center sm:items-center sm:h-[auto] sm:pt-[0px] pt-[100px]">
         <div className="w-[360px] sm:w-[1200px] sm:h-[800px] sm:border-2 sm:border-black sm:grid sm:grid-rows-[_1fr_8fr_1fr]">
        <div className="border-1 sm:border-[red] flex justify-between">
            {/* Input */}
            <div className="relative w-[500px]">
            <input type="text" className="absolute form-control scale-[1.2] top-[50%] left-[50%] translate-x-[-20%] translate-y-[-50%]" placeholder="Image-Url" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="w-[200px] flex py-[20px]">
            <button type = "button" className="btn btn-primary scale-[1.2]">Choose File</button>
            </div>
        </div>
        <div className="border-1 sm:border-[red] sm:grid sm:grid-cols-[100px_1000px_100px]">
            <div className="border-1 sm:border-[green]">

            </div>
            <div className="border-1 sm:border-[green]">
            {/* Image */}
            </div>
            <div className="border-1 sm:border-[green]">

            </div>
        </div>
        <div className="border-1 sm:border-[red] grid grid-cols-[_1fr_1fr_1fr_1fr_1fr_1fr]">
            {/* Options */}
            {OptionGroup}
        </div>
        </div>
       
    </div>
    </>
    );
}
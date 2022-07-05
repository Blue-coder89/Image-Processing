import Option from "./Option";
import { useState } from "react";
import axios from "axios";
import Image from "../Images/ProcessedImage.jpg";
import "../Styles/Main.scss";
import swal from "sweetalert";
export default function Main() {
  const [isbuttonactive, setisbuttonactive] = useState(false); // to check which buttons should be enabled at a particular situation
  // initially open is enabled and rest are diabled but as we click open and if url is correct then open will be disabled and rest of the buttons will be enabled
  const [showImage, setshowImage] = useState(false); // if the url is correct then onlt image will be rendered
  const [BrightnessLevel, setBrightnessLevel] = useState(1);
  const [ThresholdValue, setThresholdValue] = useState(0);
  const [enableBchange, setenableBchange] = useState(true); // to unable the change of brightness
  const [isOpen, setisOpen] = useState(false); // for dropdown buttons
  const [isOpenB, setisOpenB] = useState(false); // for dropdown buttons
  const [lastSuccessfulClick , setlastSuccessfulClick] = useState(""); // to check which last click operation was successful
  const resetBrightness = () => {
    setBrightnessLevel(1);
  };
  const resetThreshold = () => {
    setThresholdValue(0);
  };
  let arr = [
    "Open",
    "Reset",
    "Black and White",
    "Negative",
    "Brightness Control",
    "Threshold",
  ];
  const saveImage = async () => {
    const image = await fetch(Image); // fetch the image to get the readable stream of image data
    const imageBlob = await image.blob(); // to get the raw image data
    const imageUrl = URL.createObjectURL(imageBlob); // creating image download url
    const a = document.createElement("a");
    a.download = "my-image.jpg"; // name of the image file
    a.href = imageUrl;
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
  const checkSave = async () =>
  // prompts the user in order to save image or not
  {
    await swal("SAVE OPTION", "WANT TO SAVE?", "warning", {
      // this function demands a promise from us to click confirm
      // once we click a button (confirm or cancel) this returns the value as true or null accordingly
      buttons: {
        cancel: "No",
        confirm: "Yes",
      },
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((Yes) => {
      if (Yes) {
        saveImage();
        swal("SUCCESS", "YOUR IMAGE IS DOWNLOADING", "success");
      }
    });
  };
  const OptionGroup = arr.map((option) => {
    let disablestate = !isbuttonactive;
    if (option === "Open") disablestate = isbuttonactive;
    return (
      <Option
        name={option}
        key={option}
        handleClick={handleOptionClick}
        disablestate={disablestate}
        resetThreshold={resetThreshold}
        resetBrightness={resetBrightness}
        checkSave={checkSave}
        BrightnessLevel={BrightnessLevel}
        ThresholdValue={ThresholdValue}
        setThresholdValue={setThresholdValue}
        isOpen={isOpen}
        isOpenB={isOpenB}
        setisOpen={setisOpen}
        setisOpenB={setisOpenB}
        disableBrightness={setenableBchange}
        DisableBrightness={enableBchange}
      />
    );
  });


  const ImageProcessing = async (id) => {
    // calls the API with the image processing request

    try {
      await axios
        .put("http://localhost:8000/request_to_api/1", {
          ...data,
          requestType: id,
          relativebrightness: BrightnessLevel,
          thresholdvalue: ThresholdValue,
        })
        .then((response) => {
          if (response.data.error !== undefined) alert(response.data.error);
          else {
            setlastSuccessfulClick(id);
            setisbuttonactive(true);
            setshowImage(true);
          }
        });
    } catch (e) {
      swal("ERROR!!", e.message, "error");
    }
  };

  const [data, setData] = useState({ url: "" });
  async function handleOptionClick(id) {
    // handle if the option is clicked
    // document.location.reload();
    if (id === "Open" && data.url === "") {
      swal("EMPTY!!", "Url should not be empty", "error");
      return;
    }
    // console.log(ThresholdValue);
    else if (id === "Threshold" && ThresholdValue < 0) {
      swal("ERROR!!", "negative values not allowed", "error");
      return;
    } else if (id === "Brightness Control" && BrightnessLevel === 0) {
      return;
    }

    ImageProcessing(id);
  }

  return (
    <>
      <div className="flex sm:justify-center sm:items-center sm:h-[auto] sm:pt-[0px] pt-[100px]">
        <div className="w-[360px] sm:w-[1200px] sm:h-[800px] sm:border-2 sm:border-black sm:grid sm:grid-rows-[_1fr_8fr_1fr]">
          <div className="border-[1px] sm:border-[red] flex justify-between">
            {/* Input */}
            <div className="relative w-[500px]">
              <input
                type="text"
                className="absolute form-control scale-[1.2] top-[50%] left-[50%] translate-x-[-20%] translate-y-[-50%]"
                placeholder="Image-Url"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={data.url}
                onChange={async (e) => {
                  let str = e.target.value // stornt the current e.target.value
                  if (isOpen) {
                    if (ThresholdValue !== 0) {
                     checkSave();
                      setThresholdValue(0);
                    }
                    setisOpen(false);
                    setlastSuccessfulClick("")
                    
                  } else if (isOpenB) {
                    if (BrightnessLevel !== 1) {
                      checkSave();
                      resetBrightness();
                    }
                    setisOpenB(false);
                    setenableBchange(true);
                    setlastSuccessfulClick("")
                 
                  }
                  else if(lastSuccessfulClick !== "" && lastSuccessfulClick !== "Open" && lastSuccessfulClick !== "Reset")
                  {
                    try{
                      await axios.put("http://localhost:8000/request_to_api/1", {
                      ...data,
                      requestType: "Check Equal",
                      relativebrightness: BrightnessLevel,
                      thresholdvalue: ThresholdValue,
                    }).then((response)=> {
                      if(response.data.error !== undefined)
                        {
                          swal("ERROR!!",response.data.error,"error")          
                        }
                      else
                        {
                          if(response.data.status[0] === 'False')
                            {
                              checkSave();
                            }
                            setlastSuccessfulClick("")
                          }
                        })
                      }
                      catch(e){
                        swal("ERROR!!",e.message,"error")
                      }
                    }
                    setData({ ...data, url: str });
                    setisbuttonactive(false);
                }}
              />
            </div>
            <div className="w-[200px] flex py-[20px]">
              <button
                type="button"
                className="btn btn-primary scale-[1.2]"
                onClick={() => {
                  resetThreshold();
                  saveImage();
                  setisOpen(false);
                  resetBrightness();
                  setisOpenB(false);
                  setenableBchange(true);
                }}
                disabled={!isbuttonactive}
              >
                Save
              </button>
            </div>
          </div>
          <div className="border-[1px] sm:border-[red] sm:grid sm:grid-cols-[100px_1000px_100px]">
            <div className="border-[1px] sm:border-[green]"></div>
            <div className="border-[1px] sm:border-[green] flex justify-center items-center">
              {showImage && <img alt="HI" src={Image}></img>}
            </div>
            <div className="border-[1px] sm:border-[green] flex items-center">
              <input
                type="range"
                className="range rotate-90 scale-x-[3] scale-y-[1]"
                min="0"
                max="2"
                step="0.1"
                value={BrightnessLevel}
                onChange={(e) => {
                  setBrightnessLevel(e.target.value);
                }}
                disabled={enableBchange}
              ></input>
            </div>
          </div>
          <div className="border-[1px] sm:border-[red] grid grid-cols-[_1fr_1fr_1fr_1fr_1fr_1fr]">
            {/* Options */}
            {OptionGroup}
          </div>
        </div>
      </div>
    </>
  );
}

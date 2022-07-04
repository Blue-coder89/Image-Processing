import Option from "./Option";
import { useState } from "react";
import axios from "axios";
import Image from "../Images/ProcessedImage.jpg";
import "../Styles/Main.scss";
import swal from "sweetalert";
export default function Main() {
  const [isbuttonactive, setisbuttonactive] = useState(false);
  const [showImage, setshowImage] = useState(false);
  const [BrightnessLevel, setBrightnessLevel] = useState(0);
  const [ThresholdValue, setThresholdValue] = useState(0);
  const [enableBchange, setenableBchange] = useState(true); // to unable the change of brightness
  const [isOpen, setisOpen] = useState(false); // for dropdown buttons
  const reset = () => {
    setenableBchange((prev) => !prev);
    setBrightnessLevel(0);
  }; // this method will be called on clicking the brightness button in option.js

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
  const OptionGroup = arr.map((option) => {
    let disablestate = !isbuttonactive;
    if (option === "Open") disablestate = isbuttonactive;
    return (
      <Option
        name={option}
        key={option}
        handleClick={handleOptionClick}
        disablestate={disablestate}
        reset={reset}
        resetThreshold={resetThreshold}
        save={saveImage}
        BrightnessLevel={BrightnessLevel}
        ThresholdValue={ThresholdValue}
        setThresholdValue={setThresholdValue}
        isOpen = {isOpen}
        setisOpen = {setisOpen}
        disableBrightness = {setenableBchange}
        DisableBrightness = {enableBchange}
      />
    );
  });
  const [data, setData] = useState({ url: "" });
  async function handleOptionClick(id) {
    // handle if the option is clicked
    switch (id) {
      case "Open":
        // document.location.reload();
        if (data.url === "") {
          swal("EMPTY!!", "Url should not be empty", "error");
          break;
        }

        try {
          await axios
          .put("http://localhost:8000/request_to_api/1", {
            ...data,
              requestType: id,
              relativebrightness: BrightnessLevel,
              thresholdvalue: ThresholdValue,
            })
            .then((response) => {
              if (response.data.error !== undefined)
              alert(response.data.error);
              else {
                setisbuttonactive(true);
                setshowImage(true);
              }
            });
          } catch (e) {
          swal("ERROR!!", e.message, "error");
        }
        break;
      case "Reset":
        // document.location.reload();
        try {
          await axios
            .put("http://localhost:8000/request_to_api/1", {
              ...data,
              requestType: id,
              relativebrightness: BrightnessLevel,
              thresholdvalue: ThresholdValue,
            })
            .then((response) => {
              if (response.data.url.error !== undefined)
                alert(response.data.url.error);
              else {
                setisbuttonactive(true);
                setshowImage(true);
              }
              // console.log(response.data.url);
            });
        } catch (e) {
          swal("ERROR!!", e.message, "error");
        }
        break;
      case "Black and White":
        // document.location.reload();
        try {
          await axios
            .put("http://localhost:8000/request_to_api/1", {
              ...data,
              requestType: id,
              relativebrightness: BrightnessLevel,
              thresholdvalue: ThresholdValue,
            })
            .then((response) => {
              // console.log(response);
              if (response.data.url.error !== undefined)
                alert(response.data.url.error);
              else {
                setisbuttonactive(true);
                setshowImage(true);
              }
              // console.log(response.data.url);
            });
        } catch (e) {
          swal("ERROR!!", e.message, "error");
        }
        break;
      case "Negative":
        // document.location.reload();
        try {
          await axios
            .put("http://localhost:8000/request_to_api/1", {
              ...data,
              requestType: id,
              relativebrightness: BrightnessLevel,
              thresholdvalue: ThresholdValue,
            })
            .then((response) => {
              if (response.data.url.error !== undefined)
                alert(response.data.url.error);
              else {
                setisbuttonactive(true);
                setshowImage(true);
              }
              // console.log(response.data.url);
            });
        } catch (e) {
          swal("ERROR!!", e.message, "error");
        }
        break;
      case "Threshold":
        // console.log(ThresholdValue);
        try {
          await axios
            .put("http://localhost:8000/request_to_api/1", {
              ...data,
              requestType: id,
              relativebrightness: BrightnessLevel,
              thresholdvalue: ThresholdValue,
            })
            .then((response) => {
              if (response.data.url.error !== undefined) {
                swal("ERROR!!", response.data.url.error, "error");
              } else {
                setisbuttonactive(true);
                setshowImage(true);
              }
            });
        } catch (e) {
          swal("ERROR!!", e.message, "error");
        }
        break;
      default:
        console.log(id);
    }
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
                onChange={(e) => {
                  setisbuttonactive(false);
                  setData({ ...data, url: e.target.value });
                }}
              />
            </div>
            <div className="w-[200px] flex py-[20px]">
              <button
                type="button"
                className="btn btn-primary scale-[1.2]"
                onClick={() => {
                  reset();
                  resetThreshold();
                  saveImage();
                  setisOpen(false);
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
                min="-255"
                max="255"
                step="1"
                value={BrightnessLevel}
                onChange={(e) => setBrightnessLevel(e.target.value)}
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

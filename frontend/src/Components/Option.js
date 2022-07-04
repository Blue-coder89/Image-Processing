import "../Styles/Option.scss";
// import { useState } from "react";
import swal from "sweetalert";
export default function Option(props) {
  

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
          props.save();
          swal("SUCCESS", "YOUR IMAGE IS DOWNLOADING", "success");
        }
      });
    };

  // const toggleOpen = async () => {
  //   if (props.BrightnessLevel !== 0 || props.ThresholdValue !== 0) {
  //     await checkSave(); // prompting the user to save the image
  //   }
  //   setisOpen((prev) => !prev);
  // };
  // console.log(props.isOpen)
  const menuClass = `dropdown-menu${props.isOpen ? " show" : ""}`;
    // console.log(isOpen);
  let toRender = (
    <>
      <button
        type="button"
        className="opt opt-primary h-[60%] w-[70%] scale-[1.2]"
        onClick={async () => {
          
          console.log(props.isOpen)
          if (!props.DisableBrightness) {
            if(props.BrightnessLevel !== 0) await checkSave();
            props.reset()
            props.disableBrightness(true);
          }
          else if(props.isOpen === true)
          {
            // setisOpen(prev => !prev); // work on this plan
            // if(props.ThresholdValue !== 0)
            //   {
            //     await checkSave();
            //   }
            let a = document.getElementById("dropdownMenuButton")
              a.click()
            
            }
          props.handleClick(props.name);
        }}
        disabled={props.disablestate}
      >
        {props.name}
      </button>
    </>
  );
  if (props.name === "Brightness Control")
    toRender = (
      <button
        className="btn btn-secondary box-content w-[140px] h-[40px]"
        type="button"
        // aria-haspopup="true"
        onClick={async () => {
            if(props.BrightnessLevel !== 0) await checkSave();
            // props.disableBrightness(true);
            else if(props.isOpen === true)
            {
            // setisOpen(prev => !prev); // work on this plan
            // if(props.ThresholdValue !== 0)
            //   {
            //     await checkSave();
            //   }
            let a = document.getElementById("dropdownMenuButton")
            a.click()
            
              }
              props.reset()
          
        }}
        disabled={props.disablestate}
      >
        {props.name}
      </button>
    );

  if (props.name === "Threshold")
    toRender = (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle box-content w-[140px] h-[40px]"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          // aria-haspopup="true"
          onClick={ async () => {
             if(props.ThresholdValue !== 0)
            {
                 await checkSave()
                props.resetThreshold();
              }
            else if (!props.DisableBrightness) {
              if(props.BrightnessLevel !== 0) await checkSave();
              props.reset()
              props.disableBrightness(true);
            }
            // console.log("Hi");
           props.setisOpen((prev) => {return !prev});

          }}
          disabled={props.disablestate}
        >
          {props.name}
        </button>
        <div
          className={`${menuClass} pt-0 pb-0`}
          aria-labelledby="dropdownMenuButton"
        >
          <input
            type="number"
            className="form-control"
            placeholder="Threshold Value"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value = {props.ThresholdValue}
            onChange={(e) => {
              props.setThresholdValue(e.target.value);
            }}
          />
          <div className="flex justify-center py-[5px]">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                props.handleClick(props.name);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="border-1 sm:border-[#fff] flex justify-center items-center">
        {toRender}
      </div>
    </>
  );
}

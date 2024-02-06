import "./Input.css";
import { useId, useState } from "react";

export default function Input({label, type = "text", inputHandler, ...props}: {label: string, type?: string, inputHandler: React.FormEventHandler<HTMLInputElement>, [key: string]: any}) {

  const [isUsed, setIsUsed] = useState(false);

  const blurHandler = function(e: React.FocusEvent<HTMLInputElement>){
    if(e.target.type == "text"){
      //usuwanie białych znaków
      e.target.value = e.target.value.trim();
      //ustawianie uzycia (zapobieganie nakładaniu Label na wartość Input)
      setIsUsed(Boolean(e?.target.value))
    }
  }


  return(
    <div className={isUsed?"form-input form-input-used":"form-input"}>
      <fieldset>
        <legend>{label}</legend>
        <input type={type} onBlur={blurHandler} onChange={inputHandler} {...props}/>
      </fieldset>
      
    </div>
  )
}

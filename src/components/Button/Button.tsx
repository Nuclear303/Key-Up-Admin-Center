import "./Button.css";

export default function Button({text, highLight, clickHandler, ...props}: {text: string, highLight?: string, clickHandler: React.MouseEventHandler<HTMLButtonElement>, [key: string]: any}) {
  
  return(
    <div className="Button">
      <button className={highLight? "highLight" : ""} {...props} onClick={clickHandler}>{text}</button>
    </div>
  )
}
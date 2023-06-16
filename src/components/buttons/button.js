import './button.css'

export function Button(props){

    return(
    <button className={props.class} onClick={props.func}>{props.text}</button>
)
}
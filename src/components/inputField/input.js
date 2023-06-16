import './input.css'

export function Input(props) {
    
    return (
        <input type={props.type} placeholder={props.placeholder} className={props.class} onChange={props.func} value={props.value}/>
    )
}
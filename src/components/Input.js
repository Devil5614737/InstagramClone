export const Input=({type,placeholder,...props})=>{
    return (
       <input placeholder={placeholder} type={type} {...props}/>
    )
    }
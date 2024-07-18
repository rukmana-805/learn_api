import React,{useRef, useEffect} from "react";

let Prevprops = (props) => {

    const lastVal = useRef();

    useEffect(()=>{
        lastVal.current = props.step; //Here we assign props.step(means currnt value) to the lastVal.current but
        //it accept it's previous value as value. 
    })
    const previousValue = lastVal.current;
    return(
        <div>
            <h2>Learning Previous Props</h2>
            <p>Previous props value : {previousValue}</p>
            <p>Current props value : {props.step}</p>
            
        </div>
    )
}

export default Prevprops;
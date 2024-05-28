import React from "react";

interface IProps {
    src? : string;
    top?:number;
    left?:number;
}

const CircleDiv : React.FC<IProps> = ({src}) => {
    return (
        <div 
            className={`w-24 h-24 rounded-full shadow-lg bg-red-500 mx-4 my-2`}
            >
            <img
                className={`w-full h-full object-cover`} 
                src="" 
                alt=""
             />
        </div>
    )
}

export default CircleDiv;
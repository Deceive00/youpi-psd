import React from "react";

interface IProps {
    src? : string;
    top?:number;
    left?:number;
}

const CircleDiv : React.FC<IProps> = ({src, top, left}) => {
    return (
        <div 
            className={`w-24 h-24 absolute rounded-full shadow-xl bg-red-500 overflow-hidden`}
            style={{
                top: `${top}px`,
                left: `${left}px`
            }}
        >
            <img
                className={`w-full h-full object-cover`} 
                src="https://firebasestorage.googleapis.com/v0/b/youpi-92b43.appspot.com/o/about-us%2F72238845164.png?alt=media&token=d52c6093-6d74-426e-b7c4-276d7af28699"
                alt=""
             />
        </div>
    )
}

export default CircleDiv;
import React from 'react';
import './button-group.css'; // Import the custom CSS

interface ButtonGroupProps {
  buttons: string[];
  widthX: number;
  onSelect: (button: string) => void;
  selectedButton: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, widthX, onSelect, selectedButton }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm button-group" role="group">
      {buttons.map((button, index) => (
        <button
          key={index}
          type="button"
          className={`px-${widthX} py-2.5 text-sm font-medium text-gray-900${
            index === 0 ? 'rounded-l-lg' : index === buttons.length - 1 ? 'rounded-r-lg' : ''
          } 
          ${button === selectedButton ? 'bg-primary text-white rounded-lg z-10 ring-2 ring-primary' : 'bg-slate-50'}
          border-gray-200 hover:text-gray-400 focus:z-10 focus:ring-2 focus:rounded-lg focus:bg-primary focus:ring-primary focus:text-white
          `}
          onClick={() => onSelect(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;

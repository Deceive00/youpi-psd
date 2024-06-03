import React from 'react';
import './button-group.css'; // Import the custom CSS

interface ButtonGroupProps {
  buttons: string[];
  widthX: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, widthX }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm button-group" role="group">
      {buttons.map((button, index) => (
        <button
          key={index}
          type="button"
          className={`px-${widthX} py-2.5 text-sm font-medium text-gray-900 bg-slate-50 ${
            index === 0 ? 'rounded-l-lg' : index === buttons.length - 1 ? 'rounded-r-lg' : ''
          } border-gray-200 hover:text-gray-400 focus:z-10 focus:ring-2 focus:rounded-lg focus:bg-primary focus:ring-primary focus:text-white`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;

import { Separator } from "@radix-ui/react-select";
import React from "react"
import { FaLongArrowAltLeft } from "react-icons/fa";
import logo from "@assets/logo/default-logo.png"

interface Props {
    isOpen : boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    modalRef: React.RefObject<HTMLDialogElement>
}

const ModalBox : React.FC<Props>= ({isOpen, onClose, title, children, modalRef}) => {
    return (
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box flex flex-col bg-white text-black h-full">
          <div className="flex flex-row gap-x-4 justify-start items-center pb-4">
            <FaLongArrowAltLeft
              className="text-3xl text-primary cursor-pointer"
              onClick={onClose}
            />
            <h3 className="text-xl text-primary font-bold">{title}</h3>
          </div>
          <Separator className="border-[0.5px] rounded-lg" />
          <div className="flex flex-row justify-between text-nunito py-4">
            {/* Header */}
            <div className={`w-[50%] text-left flex flex-col justify-center`}>
              <img src={logo} alt="" className={`h-1/3 w-fit mb-2 `} />
              <h3 className={`font-bold text-black`}>Food Delivered</h3>
            </div>
            <div
              className={`w-[50%] text-right text-slate-600 flex flex-col justify-center`}
            >
              <p className={`mb-2 font-thin`}>Thursday, 13 June 2024</p>
              <p className={`font-thin`}>Order-F1239548238 </p>
            </div>
          </div>
          <Separator className="border-[0.5px] rounded-lg" />
          <div 
            className={`overflow-y-auto h-max`}>
            {children}
          </div>
          <Separator className="border-[0.5px]" />
          <div className={`w-full h-[10%] flex flex-row my-4 gap-x-4`}>
            <button className={`w-1/2 rounded-lg border border-primary text-primary font-semibold`}>Need Help</button>
            <button className={`w-1/2 bg-primary text-secondary rounded-lg font-semibold`}>Reoder</button>
          </div>
        </div>
      </dialog>
    );
}

export default ModalBox
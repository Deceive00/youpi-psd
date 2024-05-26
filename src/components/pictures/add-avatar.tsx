import { useEffect, useRef, useState } from 'react';
interface IAddAvatarProps{
  label? : any,
  register? : any,
  rules? : any,
  error? : any,
  className : string,
  disabled? : boolean,
  currentImg : any;
}

export default function AddAvatar({ label , register , rules , error, className, disabled, currentImg} : IAddAvatarProps) {
  const [image, setImage] = useState(currentImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    
    }
  };
  const handleImageChange = (files: FileList | null, ev: any) => {

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      register(label, { value: file, ...rules });
      console.log(file)
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result.toString());

        }
      };
      reader.readAsDataURL(file);
      setImage(null);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="relative">
        <div className={`rounded-[50%] overflow-hidden relative border-gray-300 ${className}`} onClick={handleImageClick}>
          {image && <img src={image} alt="Profile Preview" />}
        </div>
        <input type="file"        
          onChange={(e) => {
              handleImageChange(e.target.files, e)
            }} 
            ref={fileInputRef}
            style={{ display: 'none' }}
          disabled={disabled}
        />
      </div>
    </div>
  );
};



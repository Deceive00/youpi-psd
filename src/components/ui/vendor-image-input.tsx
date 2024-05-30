import blank from "@assets/logo/image-placeholder.webp";
import { useState } from "react";

interface ImageInputProp {
  value: string;
  onChange: (url: string | ArrayBuffer | null) => void;
}

export function ImgInput({ value, onChange }: ImageInputProp) {
  const [imageUrl, setImageUrl] = useState<string | null | ArrayBuffer>(null);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onChange(file);
        setImageUrl(reader.result);
      };
    }
  };

  function handleDivClick() {
    document.getElementById("fileInput")?.click();
  }

  return (
    <div
      className={`px-0  w-full flex justify-center items-center h-full`}
      onClick={handleDivClick}
    >
      <img
        className="sm:rounded-md h-full  object-center object-cover w-full"
        src={imageUrl ? (imageUrl as string) : blank}
        // alt = {blank}
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

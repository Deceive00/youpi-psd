import CircleDiv from "@components/ui/circle-div";
import React from "react";

const PartnerContainer: React.FC = () => {
  // Data
  const [data, setData] = React.useState<string[]>([]);

  // Backend func
  const fetchdata = async () => {
    // Masih pake dummy data
    // [!] Ganti pake dari firebase
    const imageUrls = [
      "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
      "https://res.cloudinary.com/dffeysr9l/image/upload/v1716800486/burgerrrr_qwklus.jpg",

    ];

    setData(imageUrls);
  };

  // Use Effect from backend
  React.useEffect(() => {
    fetchdata();
  }, []);

  // Transform the data into rows with incrementing numbers
  const rows: string[][] = [];
  let index = 0;
  let rowCount = 1;

  while (index < data.length) {
    rows.push(data.slice(index, index + rowCount + 1));
    index += rowCount;
    rowCount++;
  }

  return (
    <div className={`relative w-full h-full flex justify-center items-end`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`absolute flex justify-start`}
          style={{
            bottom: `${rowIndex * 100}px`,
            left: `${rowIndex * 100}px`,
            transform: `translateX(-25%) translateY(${rowIndex * 15}px) rotate(${rowIndex * 5}deg)`,
          }}
        >
          {row.map((src, index) => (
            <CircleDiv src={src} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PartnerContainer;




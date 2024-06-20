import CircleDiv from "@components/ui/circle-div";
import React from "react";

interface PartnerCircleContainerProps {
    radius:number;
    top:number;
}

const PartnerContainer: React.FC<PartnerCircleContainerProps> = ({radius, top}) => {
  // Data
  const [data, setData] = React.useState<string[]>([]);

  // Backend func
  const fetchdata = async () => {
    // Masih pake dummy data
    // [!] Ganti pake dari firebase
    const imageUrls = [
        "https://example.com/image2.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image2.jpg",
    ];

    setData(imageUrls);
  };

  // Use Effect from backend
  React.useEffect(() => {
    fetchdata();
  }, []);

  // Determine the maximum number of items
  let maxItems = Math.floor(radius / 100);
  const filteredData = data.slice(0, maxItems);

  // Transform the data into rows with incrementing numbers
  const circleRadius = radius;
  const circleCenter = circleRadius;
  const angleStep = (Math.PI / 4) / (filteredData.length - 1.5);

  return (
    <div className={`relative w-full h-auto`}>
      <div
        className={`absolute`}
        style={{
            width: circleRadius * 2,
            height: circleRadius * 1.5
        }}
      >
        {filteredData.map((src, index) => {
            const angle = index * angleStep;
            const x = circleCenter - circleRadius * Math.cos(angle) - 24;
            const y = circleCenter - circleRadius * Math.sin(angle) - 24;

            return (
                <CircleDiv
                    key={index}
                    src={src}
                    top={y}
                    left={x}
                />
            )
        })}
      </div>
    </div>
  );
};

export default PartnerContainer;

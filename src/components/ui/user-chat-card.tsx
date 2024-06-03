import { format } from "date-fns";
import React from "react";

interface UserChatCardProps {
  name: string;
  lastText: string;
  imageSrc: string;
  unread: string;
  onClick: () => void;
  date : {
    seconds:number;
    nanoseconds: number;
  } | null;
}

const UserChat: React.FC<UserChatCardProps> = ({
  name,
  lastText,
  imageSrc,
  unread,
  onClick,
  date
}) => {
  // State
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleFocus = () => setIsFocused(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleBlur = () => setIsFocused(false);

  // Format a date
  const formattedDate = date ? format(new Date(date.seconds * 1000), "hh:mm a") : "";

  const outerDivClass =
    isHovered || isFocused ? "bg-yellow-100 rounded-lg" : "";
  const unreadDivClass =
    isHovered || isFocused
      ? "bg-red-400 text-yellow-100"
      : "bg-yellow-100 text-red-400";

  return (
    <div
      className={`py-4 pr-4 pl-2 ${outerDivClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      onClick={onClick}
    >
      <div className="flex items-center bg-red-">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full"
            src={imageSrc}
            alt={`${name} image`}
          />
        </div>
        <div className="flex-1 min-w-0 max-w-xs ms-4 mr-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {lastText}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center text-sm text-gray-600">
          <span>{formattedDate}</span>
          <div
            className={`text-sm font-semibold text-red-400 px-2 rounded-full ${unreadDivClass}`}
          >
            {unread}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;

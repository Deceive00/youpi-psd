export const getFormattedTime = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

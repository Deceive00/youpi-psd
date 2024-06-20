export const getFormattedTime = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};


export const convertTimestampToDate = (timestamp : any) => {
  if(timestamp){

    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  return new Date();
};
export const convertDateToTimestamp = (date:any) => {
  if (date) {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = (date.getTime() % 1000) * 1000000;
    return { seconds, nanoseconds };
  }
  return { seconds: 0, nanoseconds: 0 };
};

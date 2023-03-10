export const dateFormatter = (time: number | Date) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDateKR = new Intl.DateTimeFormat("ko-KR", options).format(
    time
  );
  return formattedDateKR;
};

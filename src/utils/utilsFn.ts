import {
  algoThumbnail,
  htmlcssThumbnail,
  jsThumbnail,
  reactThumbnail,
  tsThumbnail,
} from "../constants/basicThumbnail";

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

export const selectBasicThumbnail = (category: string) => {
  switch (category) {
    case "React":
      return reactThumbnail;
    case "JavaScript":
      return jsThumbnail;
    case "TypeScript":
      return tsThumbnail;
    case "Algorithms":
      return algoThumbnail;
    case "HTML5 / CSS3":
      return htmlcssThumbnail;

    default:
      return;
  }
};

export const vhToPixels = (vh: number) => {
  return Math.round(window.innerHeight / (100 / vh));
};

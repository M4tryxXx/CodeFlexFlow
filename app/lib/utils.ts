import { date } from "zod";

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateYearMonth = (dateFrom: string, dateTo: string) => {
  const fromFormatted = new Date(dateFrom);
  //console.log(fromFormatted);
  const toFormatted = new Date(dateTo);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fromYear = fromFormatted.getFullYear();
  const fromMonth = months[fromFormatted.getMonth()];
  const toYear = toFormatted.getFullYear();
  const toMonth = months[toFormatted.getMonth()];
  return {
    from: {
      year: fromYear,
      month: fromMonth,
    },
    to: {
      year: toYear,
      month: toMonth,
    },
  };
};

export const formatDateMed = (dateIn: string) => {
  const fromFormatted = new Date(dateIn);
  //console.log(fromFormatted);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const month = months[fromFormatted.getMonth()];
  const day = days[fromFormatted.getDay()];
  const date = fromFormatted.getDate();
  const hours = fromFormatted.getHours();
  const minutes = fromFormatted.getMinutes();

  return `${day}, ${date} ${month} ${hours}:${minutes}`;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const slideIn = (
  direction: any = "right",
  type: any = "spring",
  delay: any = 0.5,
  duration: any = 1
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const textVariant = (delay: any) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (
  direction: any,
  type: any,
  delay: any,
  duration: any
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const firstToCapital = (str: any) => {
  const string = str.split("");
  if (string.length < 1) {
    return string;
  }

  let result = [];
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      result.push(string[i].toUpperCase());
    } else {
      result.push(string[i]);
    }
  }
  const resulted = result.join("");
  return resulted;
};

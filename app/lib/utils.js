export const formatDateToLocal = (dateStr, locale = "en-UK") => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatDateYearMonth = (dateFrom, dateTo) => {
  if (!dateTo) {
    dateTo = String(new Date(Date.now()));
  }
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

export const formatDateMed = (dateIn) => {
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

export const generatePagination = (currentPage, totalPages) => {
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
  direction = "right",
  type = "spring",
  delay = 0.5,
  duration = 1
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

export const textVariant = (delay) => {
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

export const fadeIn = (direction, type, delay, duration) => {
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

export const firstToCapital = (str) => {
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

//Three.js utils

// Function that format date obj to 01 Jan 2021 16:32 and returns a string

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const inputDate = new Date(date);
  let dateToReaturn = inputDate.getDate().toString();
  let month = inputDate.getMonth().toString();
  let year = inputDate.getFullYear().toString();
  let dayOfWeek = inputDate.getDay().toString();
  let hours = inputDate.getHours().toString();
  let minutes = inputDate.getMinutes().toString();

  switch (month) {
    case "0":
      month = "Jan";
      break;
    case "1":
      month = "Feb";
      break;
    case "2":
      month = "Mar";
      break;
    case "3":
      month = "Apr";
      break;
    case "4":
      month = "May";
      break;
    case "5":
      month = "Jun";
      break;
    case "6":
      month = "Jul";
      break;
    case "7":
      month = "Aug";
      break;
    case "8":
      month = "Sep";
      break;
    case "9":
      month = "Oct";
      break;
    case "10":
      month = "Nov";
      break;
    case "11":
      month = "Dec";
      break;
  }

  switch (dayOfWeek) {
    case "0":
      dayOfWeek = "Sun";
      break;
    case "1":
      dayOfWeek = "Mon";
      break;
    case "2":
      dayOfWeek = "Tue";
      break;
    case "3":
      dayOfWeek = "Wed";
      break;
    case "4":
      dayOfWeek = "Thu";
      break;
    case "5":
      dayOfWeek = "Fri";
      break;
    case "6":
      dayOfWeek = "Sat";
      break;
  }

  if (hours.length < 2) {
    hours = "0" + hours;
  }
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  dateToReaturn = `${dayOfWeek} ${dateToReaturn} ${month} ${year} at ${hours}:${minutes}`;

  return dateToReaturn;
};

export const getConversations = (messages, currentUser) => {
  let conversations = {};
  if (messages && messages.length > 0) {
    messages.map((message) => {
      message.from !== currentUser.username
        ? (conversations[message.from] = conversations[message.from] || {
            to_user_id: message.from_user_id,
            Messages: [],
          })
        : (conversations[message.to] = conversations[message.to] || {
            to_user_id: message.to_user_id,
            Messages: [],
          });
    });

    messages.map((message) => {
      if (message.from_user_id === currentUser.id) {
        conversations[message.to].Messages.push(message);
      } else if (message.to_user_id === currentUser.id) {
        conversations[message.from].Messages.push(message);
      }
    });
  }
  return conversations;
};

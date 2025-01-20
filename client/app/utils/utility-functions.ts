export const formatDate = (seconds: number): string => {
  const date: Date = new Date(seconds * 1000);
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //Formats date into (day, date of the month, year) format
  const year: number = date.getFullYear();
  const month: string = months[date.getMonth()];
  const day: string = days[date.getDay()];
  let dateOfMonth: string | number = date.getDate();

  //Adds a suffix to the end of the number based on which day it is
  if (dateOfMonth === 1) {
    dateOfMonth = dateOfMonth + "st";
  } else if (dateOfMonth === 2) {
    dateOfMonth = dateOfMonth + "nd";
  } else if (dateOfMonth === 3) {
    dateOfMonth = dateOfMonth + "rd";
  } else {
    dateOfMonth = dateOfMonth + "th";
  }

  return `${day}, ${month} the ${dateOfMonth}, ${year}`;
};

export const getDay = (seconds: number): string => {
  const date: Date = new Date(seconds * 1000);
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

export const formatCamelCase = (text: string) => {
  return text?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

const removeAccents = (input: string): string => {
  // Normalize the string to decomposed Unicode, then remove non-ASCII characters such as accents and diacritics
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const formatLocationName = (city: string): string => {
  city = formatCamelCase(city.toLowerCase());
  const match = city.search(/[\(\)\[\]\{\},]/); //Searches city name for any special characters or brackets/parentheses/braces/single/double quotes, and slices off anything after the match

  if (match !== -1) {
    return city.slice(0, match);
  }

  return removeAccents(city);
};

export const removeAfterHyphen = (text: string): string => {
  const match = text.search(/[_]/);

  if (match !== -1) {
    return text.slice(0, match);
  } else {
    return text;
  }
};

export const getCurrentTime = (timeZone: number): string => {
  const now = new Date().getTime() / 1000;
  return formatTime(now, timeZone, true);
};

export const formatTime = (
  seconds: number,
  timeZone: number,
  showMinutes: boolean = true
): string => {
  const date: Date = new Date((seconds + timeZone + 18000) * 1000);
  let hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");

  let period = "AM";

  // Convert 24-hour time to 12-hour time
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12; // Midnight case
  }

  return showMinutes ? `${hours}:${minutes} ${period}` : `${hours} ${period}`;
};

export const formatTimeDuration = (seconds: number): string => {
  const hours: number = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
};

export const formatStringToPath = (input: string): string => {
  return input
    .replace(/\s+/g, "-") // Replace all white spaces with hyphens
    .toLowerCase(); // Convert all letters to lowercase
};

export const findClass = (
  target: HTMLElement | null,
  className: string
): HTMLElement | null => {
  let object;
  if (target !== null) {
    if (target.className.includes(className)) {
      object = target;
    } else {
      object = findClass(target.parentElement, className);
    }
  } else {
    return null;
  }
  return object;
};

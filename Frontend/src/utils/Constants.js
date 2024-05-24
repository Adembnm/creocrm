
//const myBaseUrl = "http://localhost:3000/";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const encodeUserNameAndPass = (userName, password) => {
  var decodedStringBtoA = `[userName]${userName}[password]${password}`;
  return btoa(decodedStringBtoA);
};

export const decodeUserNameAndPass = (str) => {
  return atob(str);
};

export const fileSupportedFormats = [
  "image/JPEG",
  "image/JPG",
  "image/jpg",
  "image/png",
  "image/PNG",
  "image/jpeg",
];

export const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "اغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const arabicDays = [
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
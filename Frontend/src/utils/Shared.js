import store from "../store";
import {
  showSnackbarAction,
  hideSnackbarAction,
} from "../store/snackbar/actions";

export function dispatchSnackbarError(data) {
  if (data) {
    const errorMsg = data?.message;
    store.dispatch(showSnackbarAction(errorMsg, "error"));
    setTimeout(() => store.dispatch(hideSnackbarAction()), 3500);
  }
}
export function dispatchSnackbarSuccess(message) {
  store.dispatch(
    showSnackbarAction("Effectué avec succès", "success")
  );
}

export const counterSeconds = (expirationDate, setSeconds) => {
  const expiration_date = new Date(expirationDate).getTime();

  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeleft = expiration_date - now;
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    setSeconds(seconds);
    if (timeleft < 0) {
      clearInterval(countdownTimer);
      setSeconds(0);
    }
  }, 1000);
};

export const arabicConvertor = (txt) => {
  let car = txt;
  car = car.replace(/`/g, "ذ");
  car = car.replace(/0/g, "۰");
  car = car.replace(/1/g, "۱");
  car = car.replace(/2/g, "۲");
  car = car.replace(/3/g, "۳");
  car = car.replace(/4/g, "٤");
  car = car.replace(/5/g, "۵");
  car = car.replace(/6/g, "٦");
  car = car.replace(/7/g, "۷");
  car = car.replace(/8/g, "۸");
  car = car.replace(/9/g, "۹");
  car = car.replace(/0/g, "۰");
  car = car.replace(/q/g, "ض");
  car = car.replace(/w/g, "ص");
  car = car.replace(/e/g, "ث");
  car = car.replace(/r/g, "ق");
  car = car.replace(/t/g, "ف"); 
  car = car.replace(/y/g, "غ");
  car = car.replace(/u/g, "ع");
  car = car.replace(/i/g, "ه");
  car = car.replace(/o/g, "خ");
  car = car.replace(/p/g, "ح");
  car = car.replace(/\[/g, "ج");
  car = car.replace(/\]/g, "د");
  car = car.replace(/a/g, "ش");
  car = car.replace(/s/g, "س");
  car = car.replace(/d/g, "ي");
  car = car.replace(/f/g, "ب");
  car = car.replace(/g/g, "ل");
  car = car.replace(/h/g, "ا");
  car = car.replace(/j/g, "ت");
  car = car.replace(/k/g, "ن");
  car = car.replace(/l/g, "م");
  car = car.replace(/;/g, "ك");
  car = car.replace(/'/g, "ط");
  car = car.replace(/z/g, "ئ");
  car = car.replace(/x/g, "ء");
  car = car.replace(/c/g, "ؤ");
  car = car.replace(/v/g, "ر");
  car = car.replace(/b/g, "لا");
  car = car.replace(/n/g, "ى");
  car = car.replace(/m/g, "ة");
  car = car.replace(/,/g, "و");
  car = car.replace(/\./g, "ز");
  car = car.replace(/\//g, "ظ");
  car = car.replace(/~/g, " ّ");
  car = car.replace(/Q/g, "َ");
  car = car.replace(/W/g, "ً");
  car = car.replace(/E/g, "ُ");
  car = car.replace(/R/g, "ٌ");
  car = car.replace(/T/g, "لإ");
  car = car.replace(/Y/g, "إ");
  car = car.replace(/U/g, "‘");
  car = car.replace(/I/g, "÷");
  car = car.replace(/O/g, "×");
  car = car.replace(/P/g, "؛");
  car = car.replace(/A/g, "ِ");
  car = car.replace(/S/g, "ٍ");
  car = car.replace(/G/g, "لأ");
  car = car.replace(/H/g, "أ");
  car = car.replace(/J/g, "ـ");
  car = car.replace(/K/g, "،");
  car = car.replace(/L/g, "/");
  car = car.replace(/Z/g, "~");
  car = car.replace(/X/g, "ْ");
  car = car.replace(/B/g, "لآ");
  car = car.replace(/N/g, "آ");
  car = car.replace(/M/g, "’");
  car = car.replace(/\?/g, "؟");
  return car
}

export const englishConvertor = (txt) => {
  let car = txt;
  car = car.replace(/ذ/g, "`");
  car = car.replace(/۰/g, "0");
  car = car.replace(/۱/g, "1");
  car = car.replace(/۲/g, "2");
  car = car.replace(/۳/g, "3");
  car = car.replace(/٤/g, "4");
  car = car.replace(/۵/g, "5");
  car = car.replace(/٦/g, "6");
  car = car.replace(/۷/g, "7");
  car = car.replace(/۸/g, "8");
  car = car.replace(/۹/g, "9");
  car = car.replace(/۰/g, "0");
  car = car.replace(/ض/g, "q");
  car = car.replace(/ص/g, "w");
  car = car.replace(/ث/g, "e");
  car = car.replace(/ق/g, "r");
  car = car.replace(/ف/g, "t"); 
  car = car.replace(/غ/g, "y");
  car = car.replace(/ع/g, "u");
  car = car.replace(/ه/g, "i");
  car = car.replace(/خ/g, "o");
  car = car.replace(/ح/g, "p");
  car = car.replace(/ج/g, "[");
  car = car.replace(/د/g, "]");
  car = car.replace(/ش/g, "a");
  car = car.replace(/س/g, "s");
  car = car.replace(/ي/g, "d");
  car = car.replace(/ب/g, "f");
  car = car.replace(/ل/g, "g");
  car = car.replace(/ا/g, "h");
  car = car.replace(/ت/g, "j");
  car = car.replace(/ن/g, "k");
  car = car.replace(/م/g, "l");
  car = car.replace(/ك/g, ";");
  car = car.replace(/ط/g, "'");
  car = car.replace(/ئ/g, "z");
  car = car.replace(/ء/g, "x");
  car = car.replace(/ؤ/g, "c");
  car = car.replace(/ر/g, "v");
  car = car.replace(/لا/g, "b");
  car = car.replace(/ى/g, "n");
  car = car.replace(/ة/g, "m");
  car = car.replace(/و/g, ",");
  car = car.replace(/ز/g, ".");
  car = car.replace(/ظ/g, "/");
  car = car.replace(/ّ/g, "~");
  car = car.replace(/َ/g, "Q");
  car = car.replace(/ً/g, "W");
  car = car.replace(/ُ/g, "E");
  car = car.replace(/ٌ/g, "R");
  car = car.replace(/لإ/g, "T");
  car = car.replace(/إ/g, "Y");
  car = car.replace(/‘/g, "U");
  car = car.replace(/÷/g, "I");
  car = car.replace(/×/g, "O");
  car = car.replace(/؛/g, "P");
  car = car.replace(/ِ/g, "A");
  car = car.replace(/ٍ/g, "S");
  car = car.replace(/لأ/g, "G");
  car = car.replace(/أ/g, "H");
  car = car.replace(/ـ/g, "J");
  car = car.replace(/،/g, "K");
  car = car.replace(/\//g, "L");
  car = car.replace(/~/g, "Z");
  car = car.replace(/ْ/g, "X");
  car = car.replace(/لآ/g, "B");
  car = car.replace(/آ/g, "N");
  car = car.replace(/’/g, "M");
  car = car.replace(/؟/g, "?");
  return car
}

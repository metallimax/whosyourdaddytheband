const longDateRe = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
const longDateRepl = '$3/$2/$1';
const shortDateRe = /^([0-9]{4})-([0-9]{2})$/;
const shortDateRepl = '$2/$1';

const stringDateFormat = (str) => {
  try {
    let re;
    let repl;

    switch (str.length) {
      case 7:
        re = shortDateRe;
        repl = shortDateRepl;
        break;

      case 10:
        re = longDateRe;
        repl = longDateRepl;
        break;

      default:
        console.warn(`stringDateFormat(${str}): invalid length`);
        return str;
    }

    return str.replace(re, repl);
  } catch (e) {
    console.warn(`stringDateFormat(${str}): ${e.toString()}`);

    return str;
  }
};

const stringDurationFormat = (str) => {
  try {
    return str.substr(0, 3) === '00:' ? str.substr(3) : str;
  } catch (e) {
    console.warn(`stringDurationFormat(${str}): ${e.toString()}`);
    return str;
  }
};

export { stringDateFormat, stringDurationFormat };

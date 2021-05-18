const stringDateFormat = (str) => {
  try {
    return str.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, '$3/$2/$1');
  } catch (e) {
    console.warn(`stringDateFormat ${e.toString()}`);
    return str;
  }
};

const stringDurationFormat = (str) => {
  try {
    return str.substr(0, 3) === '00:' ? str.substr(3) : str;
  } catch (e) {
    console.warn(`stringDurationFormat ${e.toString()}`);
    return str;
  }
};

export { stringDateFormat, stringDurationFormat };

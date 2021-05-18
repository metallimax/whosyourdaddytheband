const stringDateFormat = (str) => {
  try {
    return str.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, '$3/$2/$1');
  } catch (e) {
    console.warn(`stringDateFormat ${e.toString()}`);
    return str;
  }
};

const dummy = 'dummy';

export { stringDateFormat, dummy };

const stringDateFormat = (str) => {
  return str.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, '$3/$2/$1');
};

export { stringDateFormat };

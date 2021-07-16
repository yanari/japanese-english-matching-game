export const shuffle = (array = []) => {
  let result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const consoleTable = (array = []) => {
  let table = '';
  for (let index = 0; index < array.length; index++) {
    const element = array[index].name + ' ';
    if ((index + 1) % 5 === 0) {
      element = `${array[index].name}\n`;
    }
    table += element;
  }
  return table;
};

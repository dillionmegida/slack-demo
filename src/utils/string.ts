export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const replaceAll = (
  str: string,
  find: string = ' ',
  replace: string = '-'
) => str.replace(new RegExp(find, 'g'), replace);

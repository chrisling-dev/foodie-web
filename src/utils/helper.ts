export const dateGenerator = (datetime: Date) => {
  const date = new Date(datetime);
  return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;
};

export const formatDateString = (dateString: string) => {
  const delimiter = dateString.includes("-") ? "-" : "/";
  const [year, month, day] = dateString.split(delimiter);
  return `${day}/${month}/${year}`;
};

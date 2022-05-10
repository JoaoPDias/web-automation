export const getAddCartDataTest = (itemName: string): string => {
  return `data-test="${itemName.toLocaleLowerCase().replace(" ", "_")}"`;
};

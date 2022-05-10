export const getAddItemToCartDataTest = (itemName: string): string => {
  return `data-test=add-to-cart-${itemName
    .toLocaleLowerCase()
    .replaceAll(" ", "-")}`;
};

export const getRemoveItemFromCartDataTest = (itemName: string): string => {
  return `data-test=add-to-cart-${itemName
    .toLocaleLowerCase()
    .replaceAll(" ", "-")}`;
};

export const getAbsoluteProps = (index: number, width: number, height: number) => {
  const itemsInRow = 4;
  const heightSpace = height / itemsInRow - 24;
  const widthSpace = width / itemsInRow;

  if (index < itemsInRow) {
    return {
      top: 0,
      left: index * widthSpace,
    };
  }

  if (index >= itemsInRow && index < 2 * itemsInRow) {
    return {
      top: index < itemsInRow + itemsInRow / 2 ? heightSpace : 2 * heightSpace,
      left: index % 2 === 0 ? 0 : 3 * widthSpace,
    };
  }

  return {
    top: 3 * heightSpace,
    left:
      index % 3 === 0
        ? widthSpace
        : index === 2 * itemsInRow
        ? 0
        : index % 2 === 0
        ? 2 * widthSpace
        : 3 * widthSpace,
  };
};

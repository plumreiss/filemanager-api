export const formatFile = (data) => {
  if (!data) return [];

  const rows = data.split("\n");

  let newData = [];

  rows.forEach((row) => {
    const currentRow = row.split(",");

    const numberValue = parseFloat(currentRow[2]);

    const hexValue = currentRow[3];

    if (
      !currentRow[0] ||
      !currentRow[0] ||
      isNaN(numberValue) ||
      !/^([0-9A-Fa-f]{2}){16}$/.test(hexValue)
    ) {
      return;
    }

    newData.push({
      file: currentRow[0],
      text: currentRow[1],
      number: numberValue,
      hex: hexValue,
    });
  });

  return newData;
};

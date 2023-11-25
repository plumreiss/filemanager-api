export const formatFile = (data) => {
  if (!data) return [];

  const rows = data.split("\n");

  let groupedObject = {};

  rows.forEach((row) => {
    const currentRow = row.split(",");

    const file = currentRow[0];
    const text = currentRow[1];
    const number = parseFloat(currentRow[2]);
    const hex = currentRow[3];

    if (
      !file ||
      typeof text !== "string" ||
      isNaN(number) ||
      !/^([0-9A-Fa-f]{2}){16}$/.test(hex)
    ) {
      return;
    }

    if (!groupedObject[file]) {
      groupedObject[file] = { file, lines: [] };
    }

    groupedObject[file].lines.push({
      text,
      number,
      hex,
    });
  });

  return Object.values(groupedObject);
};

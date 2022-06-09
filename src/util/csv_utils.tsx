// Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
export function arrayOfObjectsToCSV(array: any[]): string {
  // Get headers from objects
  const headers = Object.keys(array[0]);
  const headerStrings = headers.map((header) => `"${header.toString()}"`);

  const csvString =
    "data:text/csv;charset=utf-8," + headerStrings.join(",") + "\n";

  // Get values from objects
  const values = array.map((obj) =>
    headers.map((header) => `"${obj[header]?.toString() || ""}"`).join(",")
  );

  return csvString + values.join("\n");
}

export function downloadCSV(csv: string, filename: string) {
  const encodedUri = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  link.click();
}

interface Props {
  headers: string[];
  data: Object[];
}

/**
 * Render a simple table
 * @param headers The headers for the table
 * @param data A list of objects to display in the table
 * @returns A JSX element of a table
 */
function Table({ headers, data }: Props): JSX.Element {
  const renderText = (text: string) => {
    switch (text) {
      case "True":
        return <span className="text-green-500">True</span>;
      case "False":
        return <span className="text-red-500">False</span>;
      default:
        return text;
    }
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {headers.map((header) => (
            <th className="sticky top-0 bg-white px-1 py-1" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length == 0 && "Loading..."}
        {data.map((row, indexR) => (
          <tr key={indexR}>
            {Object.values(row).map((cell, indexC) => (
              <td className="border px-2 py-1" key={indexR + indexC}>
                {renderText(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

import { arrayOfObjectsToCSV, downloadCSV } from "../util";

interface Props {
  objects: any[];
  filename: string;
}

function DownloadButton({ objects, filename }: Props) {
  function handleDownload() {
    downloadCSV(arrayOfObjectsToCSV(objects), `${filename}.csv`);
  }

  return (
    <button
      className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600"
      onClick={() => handleDownload()}
    >
      Download as CSV
    </button>
  );
}

export default DownloadButton;

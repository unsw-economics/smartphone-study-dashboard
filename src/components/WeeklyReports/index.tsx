import { getUsageSummary } from "../../api";
import { arrayOfObjectsToCSV, downloadCSV } from "../../util";

interface Props {
  group: string;
  startDate: string;
}

function WeeklyReports({ group, startDate }: Props) {
  if (!group || !startDate) {
    return <div>Loading...</div>;
  }

  // Convert treatment_start_date to a Date object
  const dates = [0, 7, 14, 21].map((start) => {
    const first = new Date(startDate);
    first.setDate(first.getDate() + start);
    const last = new Date(first);
    last.setDate(last.getDate() + 6);
    return [first.toISOString().slice(0, 10), last.toISOString().slice(0, 10)];
  });

  // Download CSV file
  const handleDownload = async (start: string, end: string) => {
    const filename = `Weekly_Reports_${group}_${start}_to_${end}.csv`;
    const data = await getUsageSummary(group, start, end);
    downloadCSV(arrayOfObjectsToCSV(data), filename);
  };

  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <div className="mb-2">
          Week {i + 1} ({dates[i][0]} to {dates[i][1]})
          <button
            className="ml-6 px-4 py-2 rounded focus:outline-none disabled:opacity bg-gray-300 disabled:text-gray-500"
            type="button"
            onClick={() => handleDownload(dates[i][0], dates[i][1])}
            disabled={new Date().toISOString() < dates[i][1]}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

export default WeeklyReports;

import { getUsageSummary } from "../../api";
import { arrayOfObjectsToCSV, downloadCSV } from "../../util";

interface Props {
  group: string | null;
  treatment_start_date: string | null;
}

function WeeklyReports({ group, treatment_start_date }: Props) {
  if (!group || !treatment_start_date) {
    return <div>Loading...</div>;
  }

  // Convert treatment_start_date to a Date object
  const today = new Date();
  const start_date = new Date(treatment_start_date);
  const offsets = [0, 7, 14, 21];
  const offset_dates = offsets.map((start) => {
    const date = new Date(start_date);
    date.setDate(date.getDate() + start);
    const end_date = new Date(date);
    end_date.setDate(end_date.getDate() + 6);
    return [date, end_date];
  });

  // Format dates
  const formatted_dates = offset_dates.map(([start, end]) => {
    return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
  });

  // Download CSV file
  const handleDownload = async (start: string, end: string) => {
    const filename = `Weekly_Reports_${group}_${start}_to_${end}.csv`;
    const data = await getUsageSummary(group, start, end);
    downloadCSV(arrayOfObjectsToCSV(data), filename);
  };

  return (
    <div>
      {Array.from({ length: 4 }, (_, i) => i).map((i) => (
        <div className="mb-2">
          Week {i + 1}
          <button
            type="button"
            className="ml-6 px-4 py-2 rounded focus:outline-none disabled:opacity bg-gray-300 disabled:text-gray-500"
            disabled={today < offset_dates[i][1]}
            onClick={() =>
              handleDownload(formatted_dates[i][0], formatted_dates[i][1])
            }
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}

export default WeeklyReports;

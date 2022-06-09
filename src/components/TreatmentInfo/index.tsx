import { useState, useEffect } from "react";
import { getDates } from "../../api";

interface StudyDate {
  period_name: string;
  baseline_date: string;
  treatment_date: string;
  endline_date: string;
  over_date: string;
  is_default: Boolean;
}

function TreatmentInfo() {
  const [dates, setDates] = useState<StudyDate[]>([]);

  useEffect(() => {
    (async () => {
      const _dates = await getDates();
      setDates(_dates);
    })();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold align-left mb-2">Treatment Info</h1>
      <p className="mb-2">
        Contact Zhou if you would like to change the dates for the project
      </p>
      <h3 className="text-lg font-bold align-left mb-2">Study Dates</h3>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Group Name</th>
            <th className="border px-4 py-2">Baseline</th>
            <th className="border px-4 py-2">Treatment</th>
            <th className="border px-4 py-2">Endline</th>
            <th className="border px-4 py-2">Over</th>
            <th className="border px-4 py-2">Is Default</th>
          </tr>
        </thead>

        {dates.map((date) => (
          <tbody>
            <tr>
              <td className="border px-4 py-2">{date.period_name}</td>
              <td className="border px-4 py-2">
                {date.baseline_date.slice(0, 10)}
              </td>
              <td className="border px-4 py-2">
                {date.treatment_date.slice(0, 10)}
              </td>
              <td className="border px-4 py-2">
                {date.endline_date.slice(0, 10)}
              </td>
              <td className="border px-4 py-2">
                {date.over_date.slice(0, 10)}
              </td>
              <td className="border px-4 py-2">
                {date.is_default ? (
                  <span className="text-green-500">True</span>
                ) : (
                  <span className="text-red-500">False</span>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default TreatmentInfo;
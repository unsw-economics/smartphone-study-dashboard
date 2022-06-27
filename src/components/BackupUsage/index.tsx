import { useState, useEffect } from "react";
import { getBackupUsage } from "../../api";
import { BackupUsageInfo } from "../../ts/interfaces/api_interfaces";
import DownloadButton from "../DownloadButton";

function BackupUsage() {
  const [usage, setUsage] = useState<BackupUsageInfo[]>([]);

  useEffect(() => {
    (async () => {
      const _usage = await getBackupUsage();
      setUsage(_usage);
    })();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-bold font-bold mb-2">Usage Reports</h1>
      <DownloadButton
        objects={usage}
        filename={`usage_report_at_${new Date().toLocaleDateString()}`}
      />
      <div className="overflow-y-scroll h-5/6 my-8">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Subject ID</th>
              <th className="border px-4 py-2">Study Group</th>
              <th className="border px-4 py-2">Date Reported</th>
              <th className="border px-4 py-2">Usage</th>
              <th className="border px-4 py-2">Period</th>
              <th className="border px-4 py-2">Day</th>
            </tr>
          </thead>
          <tbody>
            {usage.map((usage) => (
              <tr key={`${usage.subject_id} ${usage.date_reported}`}>
                <td className="border px-4 py-2">{usage.subject_id}</td>
                <td className="border px-4 py-2">{usage.study_group}</td>
                <td className="border px-4 py-2">
                  {usage.date_reported.slice(0, 10)}
                </td>
                <td className="border px-4 py-2">{usage.usage}</td>
                <td className="border px-4 py-2">{usage.period}</td>
                <td className="border px-4 py-2">{usage.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BackupUsage;

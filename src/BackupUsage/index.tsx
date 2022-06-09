import { useState, useEffect } from "react";
import { getBackupUsage } from "../api";
import DownloadButton from "../DownloadButton";

interface BackupUsageInfo {
  subject_id: string;
  study_group: string;
  date_reported: string;
  usage: number;
}

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
      <h1 className="text-2xl text-bold font-bold mb-2">Backup Usage</h1>
      <DownloadButton objects={usage} filename="BackupUsage" />
      <div className="overflow-y-scroll h-5/6 my-8">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Subject ID</th>
              <th className="border px-4 py-2">Study Group</th>
              <th className="border px-4 py-2">Date Reported</th>
              <th className="border px-4 py-2">Usage</th>
            </tr>
          </thead>
          {usage.map((usage) => (
            <tbody>
              <tr>
                <td className="border px-4 py-2">{usage.subject_id}</td>
                <td className="border px-4 py-2">{usage.study_group}</td>
                <td className="border px-4 py-2">
                  {usage.date_reported.slice(0, 10)}
                </td>
                <td className="border px-4 py-2">{usage.usage}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default BackupUsage;

import { useState, useEffect } from "react";
import { getBackupUsage } from "../../api";
import { BackupUsageInfo } from "../../ts/interfaces/api_interfaces";
import DownloadButton from "../DownloadButton";
import Table from "../Table";

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
      <DownloadButton objects={usage} filename={`usage_report`} />
      <div className="overflow-y-scroll h-5/6 my-8">
        <Table
          headers={[
            "Subject ID",
            "Study Group",
            "Date Reported",
            "Usage",
            "Period",
            "Day",
          ]}
          data={usage}
        />
      </div>
    </div>
  );
}

export default BackupUsage;

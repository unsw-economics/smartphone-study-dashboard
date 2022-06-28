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
      <h6 className="font-semibold">Simple Usage</h6>
      <ul className="list-disc pl-6">
        <li>Only retrieves the total usage for the day.</li>
        <li>Is collected twice a day when the phone is on.</li>
        <li>
          Can sometimes pick up usage that isn't avaliable using the other
          method.
        </li>
      </ul>
      <h6 className="font-semibold">Detailed Usage</h6>
      <ul className="list-disc pl-6">
        <li>Can see exacly what subject spends their time on.</li>
        <li>
          Is collected once a day at midnight, and skips this collection if it
          isn't possible (phone is asleep, battery saver etc).
        </li>
        <li>
          Can sometimes pick up usage that isn't avaliable using the other
          method.
        </li>
      </ul>
      <p>
        A combination of simple and detailed usage is used to get the most
        accurate data.
      </p>

      <DownloadButton objects={usage} filename={`usage_report`} />
      <div className="overflow-y-scroll h-1/2 my-8">
        <Table
          headers={[
            "Subject ID",
            "Study Group",
            "Period",
            "Day",
            "Date Reported",
            "Simple",
            "Detailed",
            "Usage",
          ]}
          data={usage}
        />
      </div>
    </div>
  );
}

export default BackupUsage;

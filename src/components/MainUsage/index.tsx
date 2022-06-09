import { useEffect, useState } from "react";
import { getMainUsage } from "../../api";
import DownloadButton from "../DownloadButton";

function MainUsage() {
  const [usage, setUsage] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const _usage = await getMainUsage();
      setUsage(_usage);
    })();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-bold font-bold mb-2">Usage reports (Old)</h1>
      <p className="my-2">
        This is the old database for usage reports. Due to the new usage feature
        being more concise and reliable, you should only use this for debugging
        and investigations.
      </p>
      <p className="my-2">
        File is too big to display. Please download it below
      </p>
      <DownloadButton objects={usage} filename="usage_reports" />
    </div>
  );
}

export default MainUsage;

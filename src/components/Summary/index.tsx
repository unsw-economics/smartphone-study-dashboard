import { useEffect, useState } from "react";
import { getDates, getUsageSummary } from "../../api";
import { UsageSummary } from "../../ts/interfaces/api_interfaces";
import DownloadButton from "../DownloadButton";
import Table from "../Table";
import TailwindDropdown from "../TailwindDropdown";

function Summary() {
  const [usageSummary, setUsageSummary] = useState<UsageSummary[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  // Triggers on page load
  useEffect(() => {
    (async () => {
      // Retrieve possible study dates from the backend
      const dates = await getDates();
      setSelected(dates.filter((d) => d.is_default)[0].period_name);
      setGroups(dates.map((d) => d.period_name));
    })();
  }, []);

  // Triggers whenever the selected group changes
  useEffect(() => {
    (async () => {
      // Retrieve the usage report from the backend using the selected study date
      if (selected) {
        setUsageSummary(await getUsageSummary(selected));
      }
    })();
  }, [selected]);

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton
          objects={usageSummary}
          filename={`Summary_${selected}_${new Date().toLocaleDateString()}`}
        />
        <div className="flex gap-2">
          <div className="self-center text-md">Select study group:</div>
          <TailwindDropdown
            options={groups}
            selected={selected || "Loading..."}
            setSelected={setSelected}
          />
        </div>
      </div>
      <p>
        Note that this feature will only work for the data from 22T2 onwards.
        Please let the research assistant know if you need to use this feature
        for earlier data.
      </p>
      <div className="overflow-y-scroll h-5/6 my-8">
        <Table
          headers={[
            "Subject ID",
            "Group",
            "Avg treatment usage",
            "Treatment days",
            "Days under limit",
            "Avg baseline usage",
            "Baseline days",
            "Latest sign in",
            "Study Group",
          ]}
          data={usageSummary}
        />
      </div>
    </div>
  );
}

export default Summary;

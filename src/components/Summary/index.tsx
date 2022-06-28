import { useEffect, useState } from "react";
import { getDates, getUsageSummary } from "../../api";
import SelectStudyGroups from "../../SelectStudyGroups";
import { UsageSummary } from "../../ts/interfaces/api_interfaces";
import DownloadButton from "../DownloadButton";
import Table from "../Table";

function Summary() {
  const [summary, setSummary] = useState<UsageSummary[]>([]);
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
        setSummary([]);
        setSummary(await getUsageSummary(selected));
      }
    })();
  }, [selected]);

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton objects={summary} filename={`Summary_${selected}`} />
        <SelectStudyGroups {...{ groups, selected, setSelected }} />
      </div>
      <p>
        Note that this feature will only work for the data from 22T2 onwards.
        Please let the research assistant know if you need to use this feature
        for earlier data.
      </p>
      <div className="overflow-y-scroll h-1/2 my-8">
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
          data={summary}
        />
      </div>
      <h6 className="font-semibold">... or download weekly reports:</h6>
    </div>
  );
}

export default Summary;

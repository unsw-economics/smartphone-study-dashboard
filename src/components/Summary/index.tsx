import { useEffect, useState } from "react";
import { getDates, getUsageSummary } from "../../api";
import SelectStudyGroups from "../../SelectStudyGroups";
import { StudyDate, UsageSummary } from "../../ts/interfaces/api_interfaces";
import DownloadButton from "../DownloadButton";
import Table from "../Table";
import WeeklyReports from "../WeeklyReports";

function Summary() {
  const [summary, setSummary] = useState<UsageSummary[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [start_date, setStartDate] = useState<string | null>(null);
  const [dates, setDates] = useState<StudyDate[]>([]);

  // Triggers on page load
  useEffect(() => {
    (async () => {
      // Retrieve possible study dates from the backend
      const dates = await getDates();
      setDates(dates);
      setSelected(dates.filter((d) => d.is_default)[0].period_name);
    })();
  }, []);

  // Triggers whenever the selected group changes
  useEffect(() => {
    (async () => {
      // Retrieve the usage report from the backend using the selected study date
      if (selected) {
        setSummary([]);
        setStartDate(
          dates.filter((d) => d.period_name === selected)[0].treatment_date
        );
        setSummary(await getUsageSummary(selected));
      }
    })();
  }, [selected, dates]);

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton objects={summary} filename={`Summary_${selected}`} />
        <SelectStudyGroups
          groups={dates.map((d) => d.period_name)}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
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
      <WeeklyReports group={selected} treatment_start_date={start_date} />
    </div>
  );
}

export default Summary;

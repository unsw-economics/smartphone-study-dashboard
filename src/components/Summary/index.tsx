import { useEffect, useState } from "react";
import { getUsageSummary } from "../../api";
import { UsageSummary } from "../../ts/interfaces/api_interfaces";
import { SimpleStudyDate } from "../../ts/interfaces/app_interfaces";
import DownloadButton from "../DownloadButton";
import Table from "../Table";
import TailwindDropdown from "../TailwindDropdown";

function Summary() {
  const [studyDates, setStudyDates] = useState<SimpleStudyDate[]>([]);
  const [usageSummary, setUsageSummary] = useState<UsageSummary[]>([]);
  const [filteredSummary, setFilteredSummary] = useState<UsageSummary[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("Loading...");

  useEffect(() => {
    (async () => {
      const _usageSummary = await getUsageSummary();
      setUsageSummary(_usageSummary);

      // Get a list of study dates from the usage array
      var studydates: SimpleStudyDate[] = [];
      new Set(
        _usageSummary.map(
          (subject: { study_group: string }) => subject.study_group
        )
      ).forEach((studyGroup) => {
        studydates.push({
          period_name: studyGroup as string,
          is_default: studyGroup === "22T2",
        });
      });

      setStudyDates(studydates);

      // Filter subjects by study date
      var _filteredSummary: UsageSummary[] = _usageSummary.filter(
        (subject: { study_group: string }) => subject.study_group === "22T2"
      );
      setFilteredSummary(_filteredSummary);

      // Set default study date
      setSelectedGroup("22T2");
    })();
  }, []);

  function handleClick(studyGroup: string) {
    setFilteredSummary(
      usageSummary.filter(
        (subject: { study_group: string }) => subject.study_group === studyGroup
      )
    );
  }

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton
          objects={filteredSummary}
          filename={`Summary_${selectedGroup}_${new Date().toLocaleDateString()}`}
        />
        <div className="flex gap-2">
          <div className="self-center text-md">Select study group:</div>
          <TailwindDropdown
            options={studyDates.map((studyDate) => studyDate.period_name)}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            onClick={handleClick}
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
          data={filteredSummary}
        />
      </div>
    </div>
  );
}

export default Summary;

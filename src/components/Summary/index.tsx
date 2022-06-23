import { useEffect, useState } from "react";
import { getUsageSummary } from "../../api";
import DownloadButton from "../DownloadButton";
import TailwindDropdown from "../TailwindDropdown";

interface StudyDate {
  period_name: string;
  is_default: boolean;
}

interface UsageSummary {
  subject_id: string;
  test_group: number;
  avg_treatment_usage: number;
  treatment_report_days: number;
  days_under_limit: number;
  avg_baseline_usage: number;
  baseline_report_days: number;
  latest_sign_in: string;
  study_group: string;
}

function Summary() {
  const [studyDates, setStudyDates] = useState<StudyDate[]>([]);
  const [usageSummary, setUsageSummary] = useState<UsageSummary[]>([]);
  const [filteredSummary, setFilteredSummary] = useState<UsageSummary[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("Loading...");

  useEffect(() => {
    (async () => {
      const _usageSummary = await getUsageSummary();
      setUsageSummary(_usageSummary);

      // Get a list of study dates from the usage array
      var studydates: StudyDate[] = [];
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
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Subject id</th>
              <th className="px-4 py-2">Group</th>
              <th className="px-4 py-2">Avg treatment usage</th>
              <th className="px-4 py-2">Treatment days</th>
              <th className="px-4 py-2">Days under limit</th>
              <th className="px-4 py-2">Avg baseline usage</th>
              <th className="px-4 py-2">Baseline days</th>
              <th className="px-4 py-2">Latest sign in</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummary.map((subject: UsageSummary) => (
              <tr key={subject.subject_id}>
                <td className="border px-4 py-2">{subject.subject_id}</td>
                <td className="border px-4 py-2">{subject.test_group}</td>
                <td className="border px-4 py-2">
                  {subject.avg_treatment_usage}
                </td>
                <td className="border px-4 py-2">
                  {subject.treatment_report_days}
                </td>
                <td className="border px-4 py-2">{subject.days_under_limit}</td>
                <td className="border px-4 py-2">
                  {subject.avg_baseline_usage}
                </td>
                <td className="border px-4 py-2">
                  {subject.baseline_report_days}
                </td>
                <td className="border px-4 py-2">
                  {subject.latest_sign_in.replace("T", " ").substring(0, 16)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;

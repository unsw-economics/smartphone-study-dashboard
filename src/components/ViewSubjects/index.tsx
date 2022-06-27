import { useEffect, useState } from "react";
import TailwindDropdown from "../TailwindDropdown";
import { getSubjects } from "../../api";
import DownloadButton from "../DownloadButton";
import Table from "../Table";
import { Subject } from "../../ts/interfaces/api_interfaces";

interface StudyDate {
  period_name: string;
  is_default: boolean;
}

function ViewSubjects() {
  const [studyDates, setStudyDates] = useState<StudyDate[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("Loading...");

  useEffect(() => {
    (async () => {
      const _subjects = await getSubjects();
      setSubjects(_subjects);

      // Get a list of study dates from the subjects array
      var studydates: StudyDate[] = [];
      new Set(
        _subjects.map((subject: { study_group: string }) => subject.study_group)
      ).forEach((studyGroup) => {
        studydates.push({
          period_name: studyGroup as string,
          is_default: studyGroup === "22T2",
        });
      });

      setStudyDates(studydates);

      // Filter subjects by study date
      var _filteredSubjects: Subject[] = _subjects.filter(
        (subject: { study_group: string }) => subject.study_group === "22T2"
      );
      _filteredSubjects = _filteredSubjects.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
      setFilteredSubjects(_filteredSubjects);

      // Set default study date
      setSelectedGroup("22T2");
    })();
  }, []);

  function handleClick(studyGroup: string) {
    setFilteredSubjects(
      subjects
        .filter(
          (subject: { study_group: string }) =>
            subject.study_group === studyGroup
        )
        .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
    );
  }

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton
          objects={filteredSubjects}
          filename={`Subjects_${selectedGroup}_${new Date().toLocaleDateString()}`}
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
      <div>Finished survey: {filteredSubjects.length}</div>
      <div>
        Installed app:{" "}
        {filteredSubjects.filter((s) => s.identified === "True").length}
      </div>
      <div className="overflow-y-scroll h-5/6 my-8">
        <Table
          headers={[
            "ID",
            "Subject ID",
            "Email",
            "Identified",
            "Test group",
            "Intensity",
            "Limit",
            "Group",
            "Join date",
            "Last activity",
          ]}
          data={filteredSubjects.map((subject) => Object.values(subject))}
        />
      </div>
    </div>
  );
}

export default ViewSubjects;

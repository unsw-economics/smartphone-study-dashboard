import { useEffect, useState } from "react";
import TailwindDropdown from "../TailwindDropdown";
import { getSubjects } from "../../api";
import { arrayOfObjectsToCSV, downloadCSV } from "../../util";

interface StudyDate {
  period_name: string;
  is_default: boolean;
}

interface Subject {
  id: number;
  subject_id: string;
  email: string;
  secret: string;
  identified: boolean;
  test_group: number;
  treatment_intensity: number;
  treatment_limit: number;
  study_group: string;
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

  function handleDownload() {
    downloadCSV(
      arrayOfObjectsToCSV(filteredSubjects),
      `Subjects_${selectedGroup}_${new Date().toLocaleDateString()}.csv`
    );
  }

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <button
          className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600"
          onClick={() => handleDownload()}
        >
          Download as CSV
        </button>
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
        Installed app: {filteredSubjects.filter((s) => s.identified).length}
      </div>
      <div className="overflow-y-scroll h-5/6 my-8">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-3 py-2 sticky top-0 bg-white">ID</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Subject ID</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Email</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Identified</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Test group</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Intensity</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Limit</th>
              <th className="px-3 py-2 sticky top-0 bg-white">Group</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr key={subject.id}>
                <td className="border px-3 py-2">{subject.id}</td>
                <td className="border px-3 py-2">{subject.subject_id}</td>
                <td className="border px-3 py-2">{subject.email}</td>
                <td className="border px-3 py-2">
                  {subject.identified ? (
                    <span className="text-green-500">True</span>
                  ) : (
                    <span className="text-red-500">False</span>
                  )}
                </td>
                <td className="border px-3 py-2">{subject.test_group}</td>
                <td className="border px-3 py-2">
                  {subject.treatment_intensity}
                </td>
                <td className="border px-3 py-2">{subject.treatment_limit}</td>
                <td className="border px-3 py-2">{subject.study_group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewSubjects;

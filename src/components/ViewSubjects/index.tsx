import { useEffect, useState } from "react";
import { getDates, getSubjects } from "../../api";
import DownloadButton from "../DownloadButton";
import Table from "../Table";
import { Subject } from "../../ts/interfaces/api_interfaces";
import SelectStudyGroups from "../../SelectStudyGroups";

function ViewSubjects() {
  const [groups, setGroups] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

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
      // Retrieve the list of subjects from the backend using the selected study date
      if (selected) {
        setSubjects(await getSubjects(selected));
      }
    })();
  }, [selected]);

  return (
    <div className="border-2 w-full border-transparent">
      <div className="flex flex-row-reverse gap-2">
        <DownloadButton objects={subjects} filename={`Subjects_${selected}`} />
        <SelectStudyGroups {...{ groups, selected, setSelected }} />
      </div>
      <div>Finished survey: {subjects.length}</div>
      <div>
        Installed app: {subjects.filter((s) => s.identified === "True").length}
      </div>
      <div className="overflow-y-scroll h-5/6 my-8">
        <Table
          headers={[
            "ID",
            "Subject ID",
            "Email",
            "Signed In",
            "Test group",
            "Intensity",
            "Limit",
            "Group",
            "Join date",
            "Last activity",
          ]}
          data={subjects}
        />
      </div>
    </div>
  );
}

export default ViewSubjects;

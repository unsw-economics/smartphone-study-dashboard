import { useEffect, useState } from "react";
import { getDates } from "../../api";
import TailwindDropdown from "../TailwindDropdown";

interface Props {
  setSelectedGroup: (group: string) => void;
  handleClick: (option: string) => void;
}

function SelectStudyGroup({ setSelectedGroup, handleClick }: Props) {
  const [groups, setGroups] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex gap-2">
      <div className="self-center text-md">Select study group:</div>
      <TailwindDropdown
        options={groups}
        selected={selected || "Loading..."}
        setSelected={setSelectedGroup}
      />
    </div>
  );
}

export default SelectStudyGroup;

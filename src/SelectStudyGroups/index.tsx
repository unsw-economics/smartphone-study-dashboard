import TailwindDropdown from "../components/TailwindDropdown";

interface Props {
  groups: string[];
  selected: string | null;
  setSelected: (selected: string) => void;
}

function SelectStudyGroups({ groups, selected, setSelected }: Props) {
  return (
    <div className="flex gap-2">
      <div className="self-center text-md">Select study group:</div>
      <TailwindDropdown
        options={groups}
        selected={selected || "Loading..."}
        setSelected={setSelected}
      />
    </div>
  );
}

export default SelectStudyGroups;

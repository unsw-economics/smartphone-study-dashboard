import SidebarButton from "../SidebarButton";

interface Props {
  selectedButton: string;
  setSelectedButton: (button: string) => void;
}

function Sidebar({ selectedButton, setSelectedButton }: Props) {
  const handleClick = (button: string) => () => {
    if (selectedButton !== button) setSelectedButton(button);
  };

  // Map of button ids to name
  const buttons: { [key in string]: string } = {
    subjects: "View test subjects",
    treatmentDates: "View treatment dates",
    usageReportsMain: "View usage reports ",
    usageReportsBackup: "View backup usage reports",
    genWeekly: "Generate weekly reports",
    genUsage: "Generate usage summary",
  };

  return (
    <div className="outline-1 border-solid border-2 rounded-xl border-gray-300 w-1/4 px-2 mr-4 flex flex-col">
      <div className="text-xl text-center my-2">Options</div>
      {Object.keys(buttons).map((button) => (
        <SidebarButton
          isActive={selectedButton === button}
          onClick={handleClick(button)}
          key={button}
        >
          {buttons[button]}
        </SidebarButton>
      ))}
    </div>
  );
}

export default Sidebar;

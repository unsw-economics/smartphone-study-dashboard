import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SideBar from "./components/Sidebar";
import { useEffect, useState } from "react";
import NoContent from "./components/NoContent";
import ViewSubjects from "./components/ViewSubjects";
import NotCompleted from "./components/NotCompleted";
import TreatmentInfo from "./components/TreatmentInfo";
import BackupUsage from "./components/BackupUsage";
import MainUsage from "./components/MainUsage";

function App() {
  const [selectedButton, setSelectedButton] = useState("");

  // Check for token in url
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("token", token);
    }

    // Refresh page and remove token from url
    if (window.location.search.includes("token")) {
      window.location.href = window.location.href.split("?")[0];
    }
  }, []);

  // Show content depending on selected button
  var content: React.ReactNode;

  switch (selectedButton) {
    case "subjects":
      content = <ViewSubjects />;
      break;
    case "treatmentDates":
      content = <TreatmentInfo />;
      break;
    case "usageReportsMain":
      content = <MainUsage />;
      break;
    case "usageReportsBackup":
      content = <BackupUsage />;
      break;
    case "genWeekly":
      content = <NotCompleted />;
      break;
    case "genUsage":
      content = <NotCompleted />;
      break;
    default:
      content = <NoContent />;
  }

  return (
    <div className="container mx-auto h-screen max-h-screen">
      <Header />
      <div className="flex h-5/6">
        <SideBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <MainContent>{content}</MainContent>
      </div>
    </div>
  );
}

export default App;

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import NoContent from "./components/NoContent";

function App() {
  const [selectedButton, setSelectedButton] = useState("");

  return (
    <div className="container mx-auto h-screen max-h-screen">
      <Header />
      <div className="flex h-5/6">
        <SideBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        <MainContent>
          <NoContent />
        </MainContent>
      </div>
    </div>
  );
}

export default App;

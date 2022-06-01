import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SideBar from "./components/Sidebar";

function App() {
  return (
    <div className="container mx-auto h-screen max-h-screen">
      <Header />
      <div className="flex h-5/6">
        <SideBar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;

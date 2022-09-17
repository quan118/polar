import Split from "react-split";
import "./App.css";
import { Sidebar, Library, Editor } from "./components";
function App() {
  return (
    <div className="flex h-screen bg-[#FF0000]">
      <Sidebar />
      <Split class="flex flex-1" gutterSize={2} minSize={[200]}>
        <Library />
        <Editor />
      </Split>
    </div>
  );
}

export default App;

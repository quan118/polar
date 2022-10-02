import Split from "react-split";
import "./libs/fonts/Inter/inter.css";
import "./App.css";

import { Sidebar, Library, Editor } from "./components";
function App() {
  return (
    <div className="flex h-screen bg-gray-300">
      <Sidebar />
      <Split className="flex flex-1" gutterSize={2} minSize={[200]}>
        <Library />
        <Editor />
      </Split>
    </div>
  );
}

export default App;

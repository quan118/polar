/* eslint-disable prettier/prettier */
import Split from "react-split";
import "./libs/fonts/Inter/inter.css";
import "./App.css";

import { Sidebar, Library, Editor } from "./components";
function App() {
  return (
    <div className="fixed flex h-screen w-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <Split
        className="flex flex-1"
        gutterSize={5}
        minSize={[200]}
        sizes={[25, 75]}
      >
        <Library />
        <Editor />
      </Split>
    </div>
  );
}

export default App;

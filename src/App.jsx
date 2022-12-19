/* eslint-disable prettier/prettier */
import Split from "react-split";
import "./libs/fonts/Inter/inter.css";
import "./split.css";
import { Library, Editor } from "./components";
function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <Split
        className="flex h-screen w-full flex-1"
        gutterSize={5}
        minSize={[45, 0]}
        sizes={[30, 70]}
      >
        <Library />
        <Editor />
      </Split>
    </div>
  );
}

export default App;

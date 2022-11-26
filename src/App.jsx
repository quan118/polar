/* eslint-disable prettier/prettier */
import Split from "react-split";
import "./libs/fonts/Inter/inter.css";
import { Library, Editor } from "./components";
function App() {
  return (
    <div className="h-screen w-screen select-none overflow-hidden bg-gray-200">
      <div>
        <Split
          className="flex h-screen w-full flex-1"
          gutterSize={4}
          gutterStyle={() => ({
            "z-index": 10,
            "background-color": "#e7e7e7",
            width: "0.3rem",
          })}
          minSize={[0, 0]}
          sizes={[30, 70]}
        >
          <Library />
          <Editor />
        </Split>
      </div>
    </div>
  );
}

export default App;

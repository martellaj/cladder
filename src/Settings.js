import { useEffect } from "react";
import { Checkbox } from "semantic-ui-react";
import toggleDarkMode from "./toggleDarkMode";

export default function Settings(props) {
  const { setIsDarkMode, isDarkMode, selectionMode, setSelectionMode } = props;

  useEffect(() => {
    window.localStorage.setItem("seenSettings", "true");
  }, []);

  return (
    <div id="howToPlayContainer" className="howToPlayContainer">
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <div className="settingRow">
          <div className="settingName">Dark mode</div>
          <Checkbox
            checked={isDarkMode}
            onChange={(e, data) => {
              setIsDarkMode(data.checked);
              toggleDarkMode();
            }}
          />
        </div>
        <div className="settingRow">
          <div className="settingWithDescriptionContainer">
            <div className="settingName">Use "selection mode"</div>
            <div className="settingDescription">
              When you turn on "selection mode", you simply tap a tile to change
              its letter instead of typing out the whole word. Mobile users may
              find this more efficient. Turn it on and give it a try in practice
              mode!
            </div>
          </div>
          <Checkbox
            checked={selectionMode}
            onChange={(e, data) => {
              window.localStorage.setItem("selectionMode", data.checked);
              setSelectionMode(data.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
}

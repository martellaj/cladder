import { useEffect } from "react";
import { Checkbox } from "semantic-ui-react";
import toggleDarkMode from "./toggleDarkMode";

export default function Settings(props) {
  const {
    setIsDarkMode,
    isDarkMode,
    selectionMode,
    setSelectionMode,
    isHardMode,
    setIsHardMode,
    isTeacherMode,
    setIsTeacherMode,
  } = props;

  useEffect(() => {
    window.localStorage.setItem("seenSettings3", "true");
  }, []);

  return (
    <div id="howToPlayContainer" className="howToPlayContainer">
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <div className="settingRow">
          <div className="settingName">Dark Mode</div>
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
            <div className="settingName">Selection Mode</div>
            <div className="settingDescription">
              Tap to select which letter to change (suggested for mobile
              players)
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

        <div className="settingRow">
          <div className="settingWithDescriptionContainer">
            <div className="settingName">Hard Mode</div>
            <div className="settingDescription">
              No skips or extra hints (score marked with an *)
            </div>
          </div>
          <Checkbox
            checked={isHardMode}
            onChange={(e, data) => {
              window.localStorage.setItem("hardMode", data.checked);
              setIsHardMode(data.checked);
            }}
          />
        </div>

        <div className="settingRow">
          <div className="settingWithDescriptionContainer">
            <div className="settingName">Zen Mode</div>
            <div className="settingDescription">
              Removes the timer so you can play without any pressure
            </div>
          </div>
          <Checkbox
            checked={isTeacherMode}
            onChange={(e, data) => {
              window.localStorage.setItem("teacherMode", data.checked);
              setIsTeacherMode(data.checked);
            }}
          />
        </div>
      </div>
    </div>
  );
}

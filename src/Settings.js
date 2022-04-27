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
            <div className="settingName">Hard Mode</div>
            <div className="settingDescription">
              Your skip won't be available and we won't let you know which tile
              to change if you get stuck. Your score will have an asterisk to
              denote that you took the challenge!
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
            <div className="settingName">Selection Mode</div>
            <div className="settingDescription">
              When you turn on selection mode, you simply tap a tile to change
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

        <div className="settingRow">
          <div className="settingWithDescriptionContainer">
            <div className="settingName">Teacher Mode</div>
            <div className="settingDescription">
              Teacher mode is made for classroom Cladder-ing. This mode disables
              the timer to encourage collaborative classroom play.
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
export default function HowToPlay() {
  return (
    <div id="aboutContainer" className="aboutContainer">
      <div
        style={{
          width: "400px",
        }}
      >
        <div className="aboutRow">
          <h4>Email</h4>
          <a href="mailto:playcladder@gmail.com">playcladder@gmail.com</a>
        </div>
        <div className="aboutRow">
          <h4>Twitter</h4>
          <a
            href="https://twitter.com/martellaj"
            target="_blank"
            rel="noreferrer"
          >
            @martellaj
          </a>
        </div>
        <div className="aboutRow">
          <h4>Privacy Policy</h4>
          <a href="/privacy.html" target="_blank">
            View
          </a>
        </div>
      </div>
    </div>
  );
}

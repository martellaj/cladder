export default function HowToPlay() {
  return (
    <div id="aboutContainer" className="aboutContainer">
      <div
        style={{
          width: "100%",
        }}
      >
        <div className="aboutRow">
          <h4>Email</h4>
          <a href="mailto:playcladder@gmail.com">playcladder@gmail.com</a>
        </div>
        <div className="aboutRow">
          <h4>Twitter</h4>
          <a
            href="https://twitter.com/playcladder"
            target="_blank"
            rel="noreferrer"
          >
            @playcladder
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

export default function HowToPlay() {
  return (
    <div id="howToPlayContainer" className="howToPlayContainer">
      <h3 style={{ marginBottom: "30px" }}>HOW TO PLAY</h3>
      <div>
        <h4>🕵️‍♂️ You have 60 seconds to solve all 10 clues</h4>
        <h4>
          1️⃣ Each answer is only 1 letter different from the previous answer
          (e.g. JOE ➡️ JOT)
        </h4>
        <h4>
          🙅‍♀️ You are <strong>not</strong> penalized for incorrect guesses
        </h4>
        <h4>⏭ You have 2 skips (each skip costs 5 seconds)</h4>
        <h4>🕛 New puzzle at midnight!</h4>
      </div>
    </div>
  );
}

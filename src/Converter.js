import { useState } from "react";
import copy from "copy-to-clipboard";

export default function Converter() {
  const [input, setInput] = useState("");

  return (
    <div id="converterContiner" style={{ color: "black" }}>
      <textarea
        value={input}
        onChange={(e) => {
          console.log(e.target.value);
          setInput(e.target.value);
        }}
      />

      <button
        onClick={(e) => {
          const rows = input.split("\n");

          const words = [];
          const clues = [];

          for (let i = 0; i < rows.length; i++) {
            const parts = rows[i].split("\t");
            words.push(parts[1].toLowerCase());
            clues.push(parts[0].toLowerCase());
          }

          const game = [];

          for (let i = 0; i < 10; i++) {
            game.push({
              word: words[i],
              hint: clues[i + 1],
              answer: words[i + 1],
              alteredPosition: getAlteredPosition(words[i], words[i + 1]),
            });
          }

          copy(JSON.stringify(game, null, 4));
        }}
      >
        convert
      </button>
    </div>
  );
}

const getAlteredPosition = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return i;
    }
  }
};
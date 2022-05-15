import Tile from "./Tile";

export default function Archive(props) {
  const { onOptionSelected } = props;

  const todayPuzzleNumber = getPuzzleNumber();
  const content = [];

  for (let i = todayPuzzleNumber - 1; i >= 0; i--) {
    const data = window.localStorage.getItem(`puzzle-${i}`);
    const isAttempted = !!data;
    const isCompleted = data ? JSON.parse(data).score === 10 : false;

    content.push(
      <div style={{ marginBottom: "6px" }}>
        <Tile
          isSelected={false}
          onSelected={() => {
            onOptionSelected("game", i);
          }}
          altered={false}
          letter={i}
          attempted={isAttempted}
          completed={isCompleted}
        />
      </div>
    );
  }

  return <div className="archiveContainer">{content}</div>;
}

const getPuzzleNumber = (date) => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = date || new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};

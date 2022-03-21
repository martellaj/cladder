import Word from "./Word";
import "./Hint.css";

function Hint(props) {
  const { word, hint, containerClassName } = props;

  return (
    <div className={`hintContainer ${containerClassName}`}>
      <Word word={word} />
      <span className="hint">{hint}</span>
    </div>
  );
}

export default Hint;

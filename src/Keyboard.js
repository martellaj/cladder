import "./Keyboard.css";

export default function Keyboard(props) {
  const { onKeyPress } = props;

  const handleOnTouchStart = (e) => {
    const key = e.target.innerText === "⌫" ? "DELETE" : e.target.innerText;
    onKeyPress(key);
  };

  const handleOnMouseDown = (e) => {
    const key = e.target.innerText === "⌫" ? "DELETE" : e.target.innerText;
    onKeyPress(key);
  };

  return (
    <div className="keyboard">
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        q
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        w
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        e
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        r
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        t
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        y
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        u
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        i
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        o
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        p
      </button>
      <div className="key space"></div>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        a
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        s
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        d
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        f
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        g
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        h
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        j
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        k
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        l
      </button>
      <div className="key space"></div>
      <button className="key enter" tabIndex="-1"></button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        z
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        x
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        c
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        v
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        b
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        n
      </button>
      <button
        className="key letter"
        draggable={false}
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        m
      </button>
      <button
        className="key delete"
        onTouchStart={handleOnTouchStart}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseDown={handleOnMouseDown}
        tabIndex="-1"
      >
        ⌫
      </button>
    </div>
  );
}

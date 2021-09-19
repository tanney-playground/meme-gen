import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import BasicMemeCanvas from "./components/BasicMemeCanvas/BasicMemeCanvas";

const App = () => {
  const [text, setText] = useState("");
  const [textLocation, setTextLocation] = useState({ x: 0, y: 0 });

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget,
  }) => {
    setText(currentTarget.value);
  };

  const onTextLocationChange: (
    // eslint-disable-next-line no-unused-vars
    direction: "x" | "y"
  ) => ChangeEventHandler<HTMLInputElement> =
    (direction: "x" | "y") =>
    ({ target }) => {
      setTextLocation((prev) => ({
        ...prev,
        [direction]: Number(target.value),
      }));
    };

  return (
    <main>
      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={text}
          onChange={onTextChange}
          style={{ height: "100px" }}
        />
        <label htmlFor="location-x">
          X
          <input
            id="location-x"
            type="range"
            min={0}
            max={300}
            value={textLocation.x}
            onChange={onTextLocationChange("x")}
          />
        </label>
        <label htmlFor="location-y">
          Y
          <input
            id="location-y"
            type="range"
            min={0}
            max={300}
            value={textLocation.y}
            onChange={onTextLocationChange("y")}
          />
        </label>
      </div>
      <BasicMemeCanvas
        imageUrl="https://via.placeholder.com/300/000000/000000"
        text={text}
        width={300}
        height={300}
        fontOptions={{ fontColor: "red" }}
        textLoc={textLocation}
      />
    </main>
  );
};

export default App;

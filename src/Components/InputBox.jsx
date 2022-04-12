import React from "react";

function InputBox({ text, update }) {
  return (
    <div>
      <input
        type="text"
        defaultValue={text}
        className="input input-bordered input-secondary w-full max-w-xs"
        onChange={(e) => update(e, text)}
      ></input>
    </div>
  );
}

export default InputBox;

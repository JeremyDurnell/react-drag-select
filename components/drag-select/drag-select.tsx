import * as React from "react";

const DragSelect = () => {
  return (
    <div
      className="ds-selector"
      style={{
        position: "absolute",
        background: "rgba(0, 0, 255, 0.1)",
        border: "1px solid rgba(0, 0, 255, 0.45)",
        display: "block",
        pointerEvents: "none",
        left: "100px",
        top: "166px",
        width: "27px",
        height: "57px"
      }}
    ></div>
  );
};

export { DragSelect };

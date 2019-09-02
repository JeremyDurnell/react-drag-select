import * as React from "react";

interface IProps {
  _ref: React.RefObject<HTMLDivElement>;
}

const DragSelect: React.FC<IProps> = ({ _ref }) => {
  // NOTE: position attribute must match container
  return (
    <div
      className="ds-selector"
      style={{
        background: "rgba(0, 0, 255, 0.1)",
        border: "1px solid rgba(0, 0, 255, 0.45)",
        display: "none",
        pointerEvents: "none",
        position: "absolute"
      }}
      ref={_ref}
    ></div>
  );
};

export { DragSelect };

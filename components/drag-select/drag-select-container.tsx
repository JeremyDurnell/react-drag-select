import * as React from "react";
import { IDragSelectProps } from "./drag-select";

interface IDragSelectContainerProps extends IDragSelectProps {
  _ref: React.RefObject<HTMLDivElement>;
}

let i = -1;

const DragSelectContainer: React.FC<IDragSelectContainerProps> = ({
  children,
  top,
  _ref
}) => {
  i++;
  return (
    <div
      key={`foo${i}`}
      id={`container${i}`}
      style={{
        width: "300px",
        height: "300px",
        background: "rgba(0, 0, 0, 0.05)",
        border: "5px solid red",
        position: "absolute",
        overflow: "auto",
        top,
        left: "15%"
      }}
      ref={_ref}
    >
      {children}
    </div>
  );
};

export { DragSelectContainer };

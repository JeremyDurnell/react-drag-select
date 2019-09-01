import * as React from "react";
import { DragSelectContainer } from "./drag-select-container";
import { isBrowser } from "../../utils";

export interface IDragSelectProps {
  top: React.ReactText;
}

const _startup = event => startup(event);

const startup = event => {
  console.log("startup");

  if (event.target) {
    event.target.removeEventListener("mousedown", _startup);
  }
};

const start = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current.addEventListener("mousedown", _startup);
};

const DragSelect: React.FC<IDragSelectProps> = ({ top }) => {
  const containerRef = React.createRef<HTMLDivElement>();

  if (isBrowser) {
    React.useLayoutEffect(() => {
      console.log("componentDidMount", containerRef);

      start(containerRef);

      return () => {
        console.log("componentWillUnmount");
      };
    }, []);
  }

  return (
    <DragSelectContainer top={top} _ref={containerRef}>
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
    </DragSelectContainer>
  );
};

export { DragSelect };

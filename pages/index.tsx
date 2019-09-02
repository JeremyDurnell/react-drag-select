import * as React from "react";
import { DragSelectContainer, DragSelect } from "../components/drag-select";

export default () => {
  const ref1 = React.createRef<HTMLDivElement>();
  const ref2 = React.createRef<HTMLDivElement>();

  return (
    <div>
      <DragSelectContainer id="container-0" _ref={ref1}>
        <DragSelect _ref={ref1} />
        <div style={{ position: "absolute", bottom: "0", right: "0" }}>
          TEXT
        </div>
      </DragSelectContainer>
      <DragSelectContainer id="container-1" _ref={ref2}>
        <DragSelect _ref={ref2} />
      </DragSelectContainer>
    </div>
  );
};

import * as React from "react";
import { DragSelectContainer, DragSelect } from "../components/drag-select";

export default () => {
  return (
    <div>
      <DragSelectContainer top="15%">
        <DragSelect />
      </DragSelectContainer>
      <DragSelectContainer top="45%">
        <DragSelect />
      </DragSelectContainer>
    </div>
  );
};

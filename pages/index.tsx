import * as React from "react";
import { DragSelectContainer, DragSelect } from "../components/drag-select";

export default () => {
  return (
    <div>
      <DragSelectContainer top="15%" id="container-0">
        <DragSelect />
      </DragSelectContainer>
      <DragSelectContainer top="45%" id="container-1">
        <DragSelect />
      </DragSelectContainer>
    </div>
  );
};

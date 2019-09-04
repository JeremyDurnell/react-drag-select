import * as React from "react";
import {
  DragSelectContainer,
  DragSelect,
  IAreaRectangle
} from "../components/drag-select";

export default () => {
  const [selection1, setSelection1] = React.useState(null);
  const [selection2, setSelection2] = React.useState(null);

  const ref1 = React.createRef<HTMLDivElement>();
  const ref2 = React.createRef<HTMLDivElement>();

  const handleSelectionChanged = React.useCallback(
    ({ setSelection }: { setSelection: React.Dispatch<any> }) => ({
      rectangle
    }: {
      rectangle: IAreaRectangle;
    }) => {
      if (!rectangle) return;

      console.log("selected area", rectangle.ToString());
      setSelection(rectangle.ToString());
    },
    [setSelection1, setSelection2]
  );

  return (
    <div>
      <DragSelectContainer
        id="container-0"
        _ref={ref1}
        handleSelectionChanged={handleSelectionChanged({
          setSelection: setSelection1
        })}
      >
        <DragSelect _ref={ref1} />
        <div style={{ position: "absolute", bottom: "0", right: "0" }}>
          {selection1 ? selection1 : null}
        </div>
      </DragSelectContainer>
      <DragSelectContainer
        id="container-1"
        _ref={ref2}
        handleSelectionChanged={handleSelectionChanged({
          setSelection: setSelection2
        })}
      >
        <DragSelect _ref={ref2} />
        <div style={{ position: "absolute", bottom: "0", right: "0" }}>
          {selection2 ? selection2 : null}
        </div>
      </DragSelectContainer>
    </div>
  );
};

import * as React from "react";
import { isBrowser } from "../utils";

export interface IDragSelectProps {
  top: React.ReactText;
}

let i = -1;

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

const addLayoutEffect = (ref: React.RefObject<HTMLDivElement>) => {
  console.log("componentDidMount", ref);
  start(ref);
  return () => {
    console.log("componentWillUnmount");
  };
};

const DragSelect = {
  Consumer: () => {
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
  },
  Provider: ({ children, top }: IDragSelectProps & { children: any }) => {
    const ref = React.createRef<HTMLDivElement>();
    if (isBrowser) {
      React.useLayoutEffect(() => {
        addLayoutEffect(ref);
      }, []);
    }

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
        ref={ref}
      >
        {children}
      </div>
    );
  }
};

export default () => {
  return (
    <div>
      <DragSelect.Provider top="15%">
        <DragSelect.Consumer />
      </DragSelect.Provider>
      <DragSelect.Provider top="45%">
        <DragSelect.Consumer />
      </DragSelect.Provider>
    </div>
  );
};

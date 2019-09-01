import * as React from "react";
import { isBrowser } from "../../utils";

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

let i = -1;

interface IDragSelectProps {
  top: React.ReactText;
}

const DragSelectContainer: React.FC<IDragSelectProps> = ({ children, top }) => {
  const ref = React.createRef<HTMLDivElement>();
  if (isBrowser) {
    React.useLayoutEffect(() => {
      return addLayoutEffect(ref);
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
};

export { DragSelectContainer };

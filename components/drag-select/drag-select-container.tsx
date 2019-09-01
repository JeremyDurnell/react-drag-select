import * as React from "react";
import { isBrowser } from "../../utils";

const _startup = event => startup(event);

const startup = event => {
  console.log("startup");

  if (event.target) {
    event.target.removeEventListener("mousedown", _startup);
    event.target.removeEventListener("touchstart", _startup, {
      passive: false
    });
  }
};

const start = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current.addEventListener("mousedown", _startup);
  ref.current.addEventListener("touchstart", _startup, { passive: false });
};

const addLayoutEffect = (ref: React.RefObject<HTMLDivElement>) => {
  console.log("componentDidMount", ref);
  start(ref);
  return () => {
    console.log("componentWillUnmount");
  };
};

interface IDragSelectProps {
  top: React.ReactText;
  id: string;
}

const DragSelectContainer: React.FC<IDragSelectProps> = ({
  children,
  top,
  id
}) => {
  const ref = React.createRef<HTMLDivElement>();
  if (isBrowser) {
    React.useLayoutEffect(() => {
      return addLayoutEffect(ref);
    }, []);
  }

  return (
    <div
      id={id}
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

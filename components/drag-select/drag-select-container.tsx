import * as React from "react";
import { isBrowser } from "../../utils";
import { helpers } from "./helpers";

interface IDragSelectProps {
  top: React.ReactText;
  id: string;
}

const DragSelectContainer: React.FC<IDragSelectProps> = ({
  children,
  top,
  id
}) => {
  const _startup = event => startup(event);
  const _handleMove = event => handleMove(event);
  const _end = event => reset(event);
  const ref = React.createRef<HTMLDivElement>();

  const start = () => {
    ref.current.addEventListener("mousedown", _startup);
    ref.current.addEventListener("touchstart", _startup, { passive: false });
  };

  const startup = event => {
    console.log("startup");

    // touchmove handler
    if (event.type === "touchstart")
      // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
      event.preventDefault();

    if (helpers._isRightClick(event)) return;

    if (ref.current) {
      ref.current.removeEventListener("mousedown", _startup);
      ref.current.removeEventListener("touchstart", _startup);
      ref.current.addEventListener("mousemove", _handleMove);
      ref.current.addEventListener("touchmove", _handleMove, {
        passive: false
      });
      document.addEventListener("mouseup", _end);
      document.addEventListener("touchend", _end);
    }
  };

  const handleMove = event => {
    console.log("handle Move");
  };

  const reset = event => {
    document.removeEventListener("mouseup", _end);
    document.removeEventListener("touchend", _end);

    if (ref.current) {
      ref.current.removeEventListener("mousemove", _handleMove);
      ref.current.removeEventListener("touchmove", _handleMove);
      ref.current.addEventListener("mousedown", _startup);
      ref.current.addEventListener("touchstart", _startup, { passive: false });
    }
  };

  const addLayoutEffect = (ref: React.RefObject<HTMLDivElement>) => {
    console.log("componentDidMount", ref);
    start();
    return () => {
      console.log("componentWillUnmount");
    };
  };

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

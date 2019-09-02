import * as React from "react";
import { isBrowser } from "../../utils";
import Helpers from "./helpers";

interface IDragSelectProps {
  id: string;
  _ref: React.RefObject<HTMLDivElement>;
}

interface ICoords {
  x: number;
  y: number;
}

const DragSelectContainer: React.FC<IDragSelectProps> = ({
  children,
  id,
  _ref
}) => {
  const _startup = event => startup(event);
  const _handleMove = event => handleMove(event);
  const _end = event => reset(event);
  const ref = React.createRef<HTMLDivElement>();
  let initialCursorPos: ICoords = { x: 0, y: 0 };

  const start = () => {
    ref.current.addEventListener("mousedown", _startup);
    ref.current.addEventListener("touchstart", _startup, { passive: false });
  };

  const startup = event => {
    if (ref.current) {
      initialCursorPos = Helpers._getCursorPos(event, ref.current);
      console.log("initialCursorPos", initialCursorPos);
    }

    // touchmove handler
    if (event.type === "touchstart")
      // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
      event.preventDefault();

    if (Helpers._isRightClick(event)) return;

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
    if (!_ref.current) return;

    const selectorPos = Helpers._getPosition(
      event,
      ref.current,
      initialCursorPos
    );
    _ref.current.style.display = "block";
    Helpers._updatePos(_ref.current, selectorPos);
  };

  const reset = event => {
    document.removeEventListener("mouseup", _end);
    document.removeEventListener("touchend", _end);

    const box = {
      x: _ref.current.style.left,
      y: _ref.current.style.top,
      w: _ref.current.style.width,
      h: _ref.current.style.height
    };

    console.log("selected area", box);

    if (ref.current) {
      ref.current.removeEventListener("mousemove", _handleMove);
      ref.current.removeEventListener("touchmove", _handleMove);
      ref.current.addEventListener("mousedown", _startup);
      ref.current.addEventListener("touchstart", _startup, { passive: false });
    }
  };

  const addLayoutEffect = () => {
    console.log("componentDidMount", ref);
    start();
    return () => {
      console.log("componentWillUnmount");
    };
  };

  if (isBrowser) {
    React.useLayoutEffect(() => {
      return addLayoutEffect();
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
        overflow: "none",
        position: "relative"
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export { DragSelectContainer };

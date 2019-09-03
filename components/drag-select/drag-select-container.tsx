import * as React from "react";
import { isBrowser } from "../../utils";
import Helpers from "./helpers";
import { HandleSelectionChanged, ICoords, IAreaRectangle } from "./types";

interface IDragSelectProps {
  id: string;
  _ref: React.RefObject<HTMLDivElement>;
  handleSelectionChanged?: HandleSelectionChanged;
}

const DragSelectContainer: React.FC<IDragSelectProps> = ({
  children,
  id,
  _ref,
  handleSelectionChanged
}) => {
  const _startup = (event: MouseEvent | TouchEvent) => startup(event);
  const _handleMove = (event: MouseEvent | TouchEvent) => handleMove(event);
  const _end = () => reset();
  const ref = React.createRef<HTMLDivElement>();
  let initialCursorPos: ICoords = { x: 0, y: 0 };

  const start = () => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", _startup);
      ref.current.addEventListener("touchstart", _startup, { passive: false });
    }
  };

  const startup = (event: MouseEvent | TouchEvent) => {
    console.log("startup", ref.current);

    // touchmove handler
    if (event.type === "touchstart")
      // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
      event.preventDefault();

    if (Helpers._isRightClick(event)) return;

    if (ref.current) {
      initialCursorPos = Helpers._getCursorPos(
        event as MouseEvent,
        ref.current
      );
      console.log("initialCursorPos", initialCursorPos);

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

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!_ref.current) return;

    const selectorPos = Helpers._getPosition(
      event as MouseEvent,
      ref.current!,
      initialCursorPos
    );
    _ref.current.style.display = "block";
    Helpers._updatePos(_ref.current, selectorPos);
  };

  const reset = () => {
    document.removeEventListener("mouseup", _end);
    document.removeEventListener("touchend", _end);

    console.log("reset", ref.current);

    let rectangle: IAreaRectangle | null = null;
    if (_ref.current) {
      rectangle = {
        x: _ref.current.style.left!,
        y: _ref.current.style.top!,
        w: _ref.current.style.width!,
        h: _ref.current.style.height!,
        ToString: () =>
          `x:${rectangle!.x} y:${rectangle!.y} w:${rectangle!.w} h:${
            rectangle!.h
          }`
      };
    }

    if (ref.current) {
      ref.current.removeEventListener("mousemove", _handleMove);
      ref.current.removeEventListener("touchmove", _handleMove);
      ref.current.addEventListener("mousedown", _startup);
      ref.current.addEventListener("touchstart", _startup, { passive: false });

      // callback won't run on teardown (ref.current is null)
      if (handleSelectionChanged && rectangle) {
        handleSelectionChanged({ rectangle });
      }
    }
  };

  const stop = (div: HTMLDivElement) => () => {
    if (div) {
      reset();
      div.removeEventListener("mousedown", _startup);
      div.removeEventListener("touchstart", _startup);
    }

    document.removeEventListener("mouseup", _end);
    document.removeEventListener("touchend", _end);
  };

  const addLayoutEffect = () => {
    console.log("componentDidMount", ref);
    start();

    // we have to close over ref.current, because React nulls it out before we can tear down
    const unsubscribe = stop(ref.current!);

    return () => {
      console.log("componentWillUnmount");
      unsubscribe();
    };
  };

  if (isBrowser) {
    React.useLayoutEffect(() => {
      // must run in useLayoutEffect to ensure that ref.current has been assigned by React runtime
      return addLayoutEffect();
    }, [
      // ensures that addLayoutEffect runs on every render
      Date.now()
    ]);
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

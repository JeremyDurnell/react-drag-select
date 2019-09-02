// Helpers
//////////////////////////////////////////////////////////////////////////////////////

class Helpers {
  /**
   * Based on a click event object,
   * checks if the right mouse button was pressed.
   * (found @ https://stackoverflow.com/a/2405835)
   * @param {object} event
   * @return {boolean}
   * @private
   */
  _isRightClick(event) {
    var isRightMB = false;

    if ("which" in event) {
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightMB = event.which === 3;
    } else if ("button" in event) {
      // IE, Opera
      isRightMB = event.button === 2;
    }

    return isRightMB;
  }

  _getCursorPos(event, area) {
    if (!event) return { x: 0, y: 0 };
    const cPos = {
      // event.clientX/Y fallback for <IE8
      x: event.pageX || event.clientX,
      y: event.pageY || event.clientY
    };
    const areaRect = this.getAreaRect(area || document);

    return {
      // if it’s constrained in an area the area should be substracted calculate
      x: cPos.x - areaRect.left,
      y: cPos.y - areaRect.top
    };
  }

  _getPosition(event, area, initialCursorPosition) {
    const cursorPosNew = this._getCursorPos(event, area);

    let selectorPos = { x: 0, y: 0, w: 0, h: 0 };

    // right
    if (cursorPosNew.x > initialCursorPosition.x) {
      selectorPos.x = initialCursorPosition.x;
      selectorPos.w = cursorPosNew.x - initialCursorPosition.x;
      // left
    } else {
      selectorPos.x = cursorPosNew.x;
      selectorPos.w = initialCursorPosition.x - cursorPosNew.x;
    }

    // bottom
    if (cursorPosNew.y > initialCursorPosition.y) {
      selectorPos.y = initialCursorPosition.y;
      selectorPos.h = cursorPosNew.y - initialCursorPosition.y;
      // top
    } else {
      selectorPos.y = cursorPosNew.y;
      selectorPos.h = initialCursorPosition.y - cursorPosNew.y;
    }

    return selectorPos;
  }

  _updatePos(node, pos) {
    node.style.left = pos.x + "px";
    node.style.top = pos.y + "px";
    node.style.width = pos.w + "px";
    node.style.height = pos.h + "px";
    return node;
  }

  getAreaRect(area) {
    if (area === document) {
      var size = {
        y:
          area.documentElement.clientHeight > 0
            ? area.documentElement.clientHeight
            : window.innerHeight,
        x:
          area.documentElement.clientWidth > 0
            ? area.documentElement.clientWidth
            : window.innerWidth
      };
      return {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: size.x,
        height: size.y
      };
    }

    const rect = area.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: area.clientWidth || rect.width,
      height: area.clientHeight || rect.height
    };
  }
}

export default new Helpers();

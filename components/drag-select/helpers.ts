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
}

const helpers = new Helpers();

export { helpers };

import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Check Has Touch                              */
/*                                               */
/************************************************/
/*

  - Watch for touch event by user.
  - When the initial touch event is fired, the "has-no-touch" class will
    be swapped for the "has-touch" class. The detect event is then unbound,
    so it does not continue to wait for a touch event.
  - A "waiting-for-touch" class is also included, and will be removed on touch event.
  - Classes names are applied to the html tag


  *************
  * Contents: *
  *************

  # Constructor
  # Adjust Properties
  # Public
      > Detect Touch
  # Protected
      > Handle Touch
  # Export

*/

class CheckHasTouch {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(){
    this._waitingForTouchClass = "waiting-for-touch"; // class to indicate waiting for touch event
    this._addClassOnTouch = "has-touch"; // class to add on touch event
    this._removeClassOnTouch = "has-no-touch"; // class add initially, but remove on touch event
  }

  /**************************************/
  /*   # Adjust Properties             */
  /************************************/

  get waitingForTouchClass(){return _waitingForTouchClass;}
  set waitingForTouchClass(classStr){this._waitingForTouchClass = classStr;}

  get addClassOnTouch(){return _addClassOnTouch;}
  set addClassOnTouch(classStr){this._addClassOnTouch = classStr;}

  get removeClassOnTouch(){return _removeClassOnTouch;}
  set removeClassOnTouch(classStr){this._removeClassOnTouch = classStr;}

  /**************************************/
  /*   # Public                        */
  /************************************/

  /********************
  *  > Detect Touch   *
  ********************/

  /*
  Detect
  Set an event to wait for a touch event from the user.
  On touch, the waiting class and remove-on-touch class will be removed, the add-on-touch will be added.
  The touch event will also be unbound.
  */
  detect(){
    let target = $('html');
    target.addClass(this._waitingForTouchClass); // add waiting class initially
    target.addClass(this._removeClassOnTouch); // add
    $(window).on('touchstart', ()=>{
      this._handleTouch(target);
    });
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /********************
  *  > Handle Touch   *
  ********************/

  /*
  Handle Touch
  On touch event:
    - remove the waiting class
    - remove the remove-on-touch class
    - add the add-on-touch class
    - unbind the touch start event.

    target (node) - the element assigned the touch event, with indicator class names
  */
  _handleTouch(target){
    target.addClass(this._addClassOnTouch);
    target.removeClass(this._removeClassOnTouch);
    $(window).unbind('touchstart');
  }
}

/**************************************/
/*   # Export                        */
/************************************/

export default CheckHasTouch;

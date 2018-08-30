import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Click Image To Full (ClickImageToFull.class.js)
/*                                               */
/************************************************/
/*

  - Click image to enlarge to full size or screen size.
  - This script toggles a 'full' class but does not style the elements,
    this should be taken care of if one of the style files (_full-on-click.css)
  - To enable event for an element,
    give image wrapper tag (ex: figure or div) the class 'full-on-click' (or selector set on construct).
  - Entry Point: ClickImageToFull.setEvents();


  *************
  * Contents: *
  *************

  # Constructor
  # Config
  # Public
  # Protected
  # Export

*/


class ClickImageToFull {


  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(selector = ".full-on-click") {
    console.log('Fill constructor');
    this._applySelector = selector;
    this._fullClass = "full-on-click--full";
    console.log($(selector));
  }

  /**************************************/
  /*   # Config                        */
  /************************************/

  get fullClass () {
    return this._fullClass;
  }
  set fullClass(classStr){
    this._fullClass = classStr;
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

  setEvents(){
    this._clickToFull(this._fullClass);
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  _clickToFull(fullClass){
    $(this._applySelector).on('click', function() {
      this.classList.toggle(fullClass);
    });
  }
}

/**************************************/
/*   # Export                        */
/************************************/

export default ClickImageToFull;

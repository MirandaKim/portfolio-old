import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Navigation Display (NavDiplay.class.js)      */
/*                                               */
/************************************************/
/*

  - Create toggle events for adding/removing the navigation menu's display class.
  - This script only adds/removes class names, and does not actually animate or change any structures.
    Animation/display of main navigation should be handled through CSS using the class names added/removed
    via this script.
  - Availible events:
      - click to toggle
      - click to open
      - click to close
      - focus to open / blur to close
  - Set Events Config outline:
      {
        toggleSelectors: [], // array of selector strings: each click to toggle menu
        closeSelectors: [], // array of selector strings: each click to close menu
        openSelectors: [], // array of selector strings: each click to open menu
        focusSelectors: [] // array of selector strings: each focus to open menu (blur ot close)
      }

  *************
  * Contents: *
  *************

  # Constructor

  # Public
    > Controls
    > Set Events

  # Protected
    > Set Toggle Events
    > Set Close Events
    > Set Open Events
    > Set Focus Events

  # Export

*/
class NavDisplay {

  /**************************************/
  /*   # Constructor                   */
  /************************************/
  constructor(mainNavSelector, navDisplayClass, bodyToggleClass="menu-open") {
    this._body = $('body');
    this._navMenu = $(mainNavSelector);
    this._displayClass = navDisplayClass;
    this._bodyToggleClass = bodyToggleClass;
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

    /*****************
    *   > Controls   *
    *****************/

    /*Public method to open/display the main navigation*/
    openMenu(){
      this._navMenu.addClass(this._displayClass);
      this._body.addClass(this._bodyToggleClass);
    }
    /*Public method to close/hide the main navigation*/
    closeMenu(){
      this._navMenu.removeClass(this._displayClass);
      this._body.removeClass(this._bodyToggleClass);
    }
    /*Public method to toggle the display of the main navigation*/
    toggleMenu(){
      this._navMenu.toggleClass(this._displayClass);
      this._body.toggleClass(this._bodyToggleClass);
    }


    /*******************
    *   > Set Events   *
    ********************
    Set the events responsible to adding/removing the display class to the navigaiton menu
    Config: {
      toggleSelectors: [], // list of selectors that will TOGGLE the menu's display class when clicked
      closeSelectors: [], // list of selectors that will REMOVE the menu's display class when clicked
      openSelectors: [] // list of selectors that will ADD the menu's display class when clicked
      focusSelectors: [] // list of selectors that will ADD the menu's display class when in focus
    }
    */
    setEvents (config){
      this._setFocusEvents(config.focusSelectors);
      this._setToggleEvents(config.toggleSelectors);
      this._setCloseEvents(config.closeSelectors);
      this._setOpenEvents(config.openSelectors);
    }

  /**************************************/
  /*   # Protected                     */
  /************************************/

    /*************************
    *   > Set Focus Events   *
    *************************/
    /*
    Set the events for which elements will OPEN the menu display class when in focus
    */
    _setFocusEvents(selectors = []){
      for(let selector of selectors){
        $(selector).focus(() => {
          this.openMenu();
        });
        $(selector).blur(() => {
          this.closeMenu();
        });
      }
    }

    /**************************
    *   > Set Toggle Events   *
    **************************/
    /*
    Set the events for which elements will TOGGLE the menu display class when clicked
    */
    _setToggleEvents(selectors = []){
      for(let selector of selectors){
        $(selector).click(() => {
          this.toggleMenu()
        });
      }
    }

    /*************************
    *   > Set Close Events   *
    *************************/
    /*
    Set the events for which element will REMOVE the menu display class when clicked
    */
    _setCloseEvents(selectors = []){
      for(let selector of selectors){
        $(selector).click(() => {
          this.closeMenu();
        });
      }
    }

    /************************
    *   > Set Open Events   *
    ************************/
    /*
    Set the events for which elements will ADD the menu display class when clicked
    */
    _setOpenEvents(selectors = []){
      for(let selector of selectors){
        $(selector).click(() => {
          this.openMenu();
        });
      }
    }

}

/**************************************/
/*   # Export                        */
/************************************/

export default NavDisplay;

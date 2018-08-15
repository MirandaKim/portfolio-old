import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Navigation Display (NavDiplay.class.js)      */
/*                                               */
/************************************************/
/*

  - Create toggle events for adding/removing the navigation menu's display class.

  *************
  * Contents: *
  *************

  # Constructor

  # Public
    > Set Events

  # Protected
    > Set Toggle Events
    > Set Close Events
    > Set Open Events

  # Export

*/
class NavDisplay {


  /**************************************/
  /*   # Constructor                   */
  /************************************/
  constructor(mainNavSelector, navDisplayClass, bodyToggleClass="menu-open") {
    this.navMenu = $(mainNavSelector);
    this.displayClass = navDisplayClass;
    this.bodyToggleClass = bodyToggleClass;
  }


  /**************************************/
  /*   # Public                        */
  /************************************/

    /*******************
    *   > Set Events   *
    ********************
    Set the events responsible to adding/removing the display class to the navigaiton menu
    Config: {
      toggleSelectors: [], // list of selectors that will TOGGLE the menu's display class when clicked
      closeSelectors: [], // list of selectors that will REMOVE the menu's display class when clicked
      openSelectors: [] // list of selectors that will ADD the menu's display class when clicked
    }
    */
    setEvents (config){
      this._setToggleEvents(config.toggleSelectors);
      this._setCloseEvents(config.closeSelectors);
      this._setOpenEvents(config.openSelectors);

    }

  /**************************************/
  /*   # Protected                     */
  /************************************/

    /**************************
    *   > Set Toggle Events   *
    **************************/
    /*
    Set the events for which elements will TOGGLE the menu display class when clicked
    */
    _setToggleEvents(selectors = []){
      for(let selector of selectors){
        $(selector).click(() => {
          this.navMenu.toggleClass(this.displayClass);
          $('body').toggleClass(this.bodyToggleClass);
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
          this.navMenu.removeClass(this.displayClass);
          $('body').removeClass(this.bodyToggleClass);
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
          this.navMenu.addClass(this.displayClass);
          $('body').addClass(this.bodyToggleClass);
        });
      }
    }
}

/**************************************/
/*   # Export                        */
/************************************/

export default NavDisplay;

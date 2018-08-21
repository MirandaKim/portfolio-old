import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

/****************************************************/
/*                                                 */
/*   Reveal On Scroll (RevealOnScroll.class.js)   */
/*                                               */
/************************************************/
/*

  - Use Waypoints to add a reveal class to elements when they are scrolled to.
  - This reveal class is intented to trigger a css animation--this script does not provide the actual animation.
  - 'reveal-on-scroll': To apply functionality to an element, give the element the class 'reveal-on-scroll'
    (or another if set via Config).
  - Public entry: RevealOnScroll.execute();
  - Suggestion: The item should be hidden via css initially so there is no display delay before JS can add a hidden class.
    BUT! Make sure the element is not hidden if the device does not have JS enabled (See Has No JS in App.js).


  *************
  * Contents: *
  *************

  # Constructor

  # Config

  # Public
    > Execute

  # Protected
    > Create Waypoints

  # Export

*/

class RevealOnScroll {

/**************************************/
/*   # Constructor                   */
/************************************/

    constructor(){
        this._itemToRevealSelector = '.reveal-on-scroll';
        this._showClass = 'reveal-on-scoll--visible';
        this._revealOffset = "90%";
    }

  /**************************************/
  /*   # Config                        */
  /************************************/

  get itemToRevealSelector(){
    return this._itemToRevealSelector;
  }
  set itemToRevealSelector(selectorStr){
    this._itemToRevealSelector = selectorStr;
  }

  get showClass(){
    return this._showClass;
  }
  set showClass(classStr){
    this._showClass = classStr;
  }

  get revealOffset(){
    return this._revealOffset()
  }

  set revealOffset (offset){
    this._revealOffset = offset;
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

    /****************
    *   > Execute   *
    ****************/
      /*
      Create waypoints for each of the selected elements.
      */
    execute(){
      let nodes = $(this._itemToRevealSelector);
      if(nodes.length > 0){
        this._createWaypoints(nodes);
      }
    }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /*************************
  *   > Create Waypoints   *
  *************************/
  /*
  Give parameter nodes the show class (see Config)
  when user scrolls into offset range.
  */
    _createWaypoints(nodes){
        let showClass = this._showClass;
        let revealOffset = this._revealOffset;
        nodes.each(function(index, node){
            new Waypoint({
                element: node,
                offset: revealOffset,
                handler: () => {
                  node.classList.add(showClass);
                }
            });
        });
    }

}

/**************************************/
/*   # Export                        */
/************************************/

export default RevealOnScroll;

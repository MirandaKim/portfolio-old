import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

/****************************************************/
/*                                                 */
/*   Reveal On Scroll (RevealOnScroll.class.js)   */
/*                                               */
/************************************************/
/*

  - Use Waypoints to remove a 'hidden' class from elements when they are scrolled to.
  - Removing this 'hidden' class is intented to trigger a css animation--this script does not provide the actual animation.
  - Refer to css file for animations: ~/src/assets/styles/modules/_reveal-on-scroll.
  - 'reveal-on-scroll': To apply functionality to an element, give the element the class 'reveal-on-scroll'
    (or another if set via Config).
  - Elements with the reveal class will be given the class 'reveal-on-scroll--hidden' (or as set by config) on execute.
  - Public entry: RevealOnScroll.execute();
  - Known Issue: using css transform can interfear with sub elements that use fix position,
    a possible fix is commented-out within this._createWaypoints()


  *************
  * Contents: *
  *************

  # Constructor

  # Config

  # Public
    > Execute

  # Protected
    > Hide Initially
    > Create Waypoints

  # Export

*/

class RevealOnScroll {

/**************************************/
/*   # Constructor                   */
/************************************/

    constructor(){
        this._itemToRevealSelector = '.reveal-on-scroll';
        this._hideClass = 'reveal-on-scroll--hidden';
        this._revealOffset = "95%";
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

  get hideClass(){
    return this._hideClass;
  }
  set hideClass(classStr){
    this._hideClass = classStr;
  }

  get revealOffset(){
    return this._revealOffset;
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
      this._hideInitially(nodes);
      if(nodes.length > 0){
        this._createWaypoints(nodes);
      }
    }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /***********************
  *   > Hide Initially   *
  ***********************/

  _hideInitially(nodes){
    nodes.addClass(this._hideClass);
  }

  /*************************
  *   > Create Waypoints   *
  *************************/
  /*
  Give parameter nodes the show class (see Config)
  when user scrolls into offset range.
  */
    _createWaypoints(nodes){
        let hideClass = this._hideClass;
        let revealOffset = this._revealOffset;
        nodes.each(function(index, node){
          let config = {
              element: node,
              offset: revealOffset,
              handler: (direction) => {
                if(direction == 'down') {
                  console.log('down' + index);
                  node.classList.remove(hideClass);
                  /*
                  FIX: this is a temporariy fix for testing,
                  TODO: integrate this fix properly.
                  */
                  // setTimeout(function(){
                    // node.classList.remove('reveal-on-scroll');
                  // }, 1500);
                }
              }
          }
            new Waypoint(config);
        });
    }

}

/**************************************/
/*   # Export                        */
/************************************/

export default RevealOnScroll;

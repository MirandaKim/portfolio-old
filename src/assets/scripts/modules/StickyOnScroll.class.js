import $ from 'jquery';
import waypoints from '~/node_modules/waypoints/lib/noframework.waypoints';

/****************************************************/
/*                                                 */
/*   Sticky On Scroll                             */
/*                                               */
/************************************************/
/*

  Simple module for adding/removing a "sticky" class name from an element
  when a user scrolls away/to the top of the document.

  - Add the class 'trigger-sticky' to an element in your html.
    This element will trigger the class name change.
  - Add the class 'make-sticky' to any elements in your html.
    These elements will receive the sticky class when the user scrolls to the 'trigger-sticky' element.
  - The default sticky class is: "--sticky"
  - Want to use existing class names instead of adding 'make-sticky' and 'trigger-sticky'?
    Use your custom values when constucting & calling execute (see custom example below).
  - PUBLIC ENTRY POINT: StickyOnScroll.execute(...)

  EX (defaults):
    import StickyOnScroll from './StickyOnScroll.class';
    let stickyOnScroll = new StickyOnScroll();
    stickyOnScroll.execute();

  EX (custom):
    import StickyOnScroll from './StickyOnScroll.class';
    let stickyOnScroll = new StickyOnScroll('h1');
    stickyOnScroll.execute('.banner', 'banner--sticky');


  *************
  * Contents: *
  *************

  # Constructor
  # Public
      > Execute
  # Protected
      > Create Sticky Waypoint
  # Export

*/


class StickyOnScroll {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(triggerPtSelector = '.trigger-sticky') {
    this.triggerElement = $(triggerPtSelector);
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

  /*****************
   *   > Execute   *
   ****************/
  /*
  ENTRY POINT
  Execute
  Provide target element with the sticky-on-scroll handle functionality

  targetSelector(string) - selector or element to modify on scroll to/from top.
  stickyClass(string) - class name to togggle based on document position.
  */
  execute(targetSelector='.make-sticky', stickyClass='--sticky'){
    try{
      this._createStickyWaypoint(targetSelector, stickyClass);
    }catch(err){
      console.log(`StickyOnScroll -- ${err}`);
    }

  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /********************************
   *   > Create Sticky Waypoint   *
   *******************************/

   /*
   Create Sticky Waypoint
   - Remove the sticky class from the target when user is scrolled to the top of the document
   - Add the sticky class to the target when user scrolls away from the top of the document
   */
   _createStickyWaypoint(targetSelector, stickyClass){
     let target = $(targetSelector);
     let config = {
       element: this.triggerElement[0],
       handler: (direction) => {
         if(direction == "down") {
           /*
           If scrolling away from top of document
           add the sticky class.
           */
           target.addClass(stickyClass)
         }else {
           /*
           If scrolling to the top of the document
           remove the sticky class.
           */
           target.removeClass(stickyClass)
         }
       }
     }
     new Waypoint(config);
   }

}

/**************************************/
/*   # Export                        */
/************************************/

export default StickyOnScroll;

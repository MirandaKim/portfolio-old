import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Smooth Scroll (SmoothScroll.class.js)        */
/*                                               */
/************************************************/
/*

  - When an anchor link is triggered, the page scrolls to the selected content.
  - Applies to all links beginning with a hash (#)
  - URL updates and the element focus is maintained
  - Use SmoothScroll.scrollTime to set the time it takes to scroll in milliseconds
  - originally found via in Update 3 on http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links

  - Entry point: static function SmoothScroll.setEvents()
  - See config section below for set/get options

  ***********
  * Content *
  ***********

    # Constructor

    # Config
      > Scroll Time

    # Public
      > Set Events

    # Protected
      > Enable Smooth Scroll
      > Is Valid Link
      > Set Link Click Event
      > Handle Link Click
      > Smooth Scroll To New Focus
      > Change Focus To Target
      > Utilities

    # Export

*/

class SmoothScroll {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(scrollTime) {
    this._scrollTime = 1000; // default animation time to scroll to target content (milliseconds)
  }

  /**************************************/
  /*   # Config                        */
  /************************************/
  /*
  Adjust Smooth Scroll configurations before running entry point setEvents()
  */

  /*********************
   *   > Scroll Time   *
   ********************/
   /*default animation time to scroll to target content (milliseconds)*/

  get scrollTime() {
    return this._scrollTime;
  }

  set scrollTime(milliseconds) {
    this._scrollTime = milliseconds;
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

  /********************
   *   > Set Events   *
   *******************/
   /*ENTRY POINT*/
  setEvents() {
    this._enableSmoothScroll();
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /******************************
   *   > Enable Smooth Scroll   *
   *****************************/

  /*
    Enable Smooth Scroll
    For each of the valid anchor links,
    apply the smooth scroll functionality on click.
  */
  _enableSmoothScroll() {
    // URL updates and the element focus is maintained
    // originally found via in Update 3 on http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links

    var locationPath = this._filterPath(location.pathname); // get current path name (filtered)
    for (let link of $('a[href*="#"]')) { // all local anchor links: links starting with '#'
      let validLink = this._isValidLink(link, locationPath); // check if link qualifies for the smooth scroll event
      if (validLink) {
        this._setLinkClickEvent(link);
      }
    }
  }

  /***********************
   *   > Is Valid Link   *
   **********************/
  /*
  Is Valid Link
  Check if a link qualifies for the smooth scroll function to be applied.
  Checks include: has length, link host name matches current path...

  link (node) - the link node to be validated
  locationPath (string) - current path name
  Returns boolean TRUE if the link passes all validity checks, else FALSE.
  */
  _isValidLink(link, locationPath) {
    let linkPath = this._filterPath(link.pathname) || locationPath;
    let hash = link.hash;
    return $(hash).length &&
      locationPath == linkPath &&
      (location.hostname == link.hostname || !link.hostname) &&
      link.hash.replace(/#/, '');
  }

  /******************************
   *   > Set Link Click Event   *
   *****************************/

   /*
   Set Link Click Event
   Apply the click event handler to a link

   link (node) - the link to apply the click event to
   */
  _setLinkClickEvent(link) {
    let targetId = link.hash;
    $(link).click((event) => {
      this._handleLinkClick(targetId);
    });
  }

  /***************************
   *   > Handle Link Click   *
   **************************/
   /*
   Handle Link Click
   The handler for a smooth scroll link when clicked.
   Link's default behavior is overridden with a scroll animation
   and change in focus.

   targetId (string) - ID of the destination (link's hash value)
   */
  _handleLinkClick(targetId) {
    event.preventDefault(); // stop the link from doing what links do
    /*
    Animate the body to the target location,
    then manually change the focus to the target content.
    */
    this._smoothScrollToNewFocus(targetId);
  }

  /************************************
   *   > Smooth Scroll To New Focus   *
   ***********************************/

  /*
  Smooth Scroll To New Focus
  - Scroll html/body to the indicated target element
  - Make the target the new focus

  targetId (string) - Id of the element to scroll to and change the focus to.
  */
  _smoothScrollToNewFocus(targetId){
    $('html, body').animate({
      scrollTop: $(targetId).offset().top // animate vertically to the top of the target element.
    }, this._scrollTime, () => {
      this._changeFocusToTarget(targetId); // change the focus to the target element.
    });
  }

  /********************************
   *   > Change Focus To Target   *
   *******************************/

   /*
   Change Focus To Target
   Change the focus to the target element.

   targetId (string) - ID of element to change focus to
   */
  _changeFocusToTarget(targetId) {
    let targetNode = $(targetId);
    location.hash = targetId;
    targetNode.focus();
    if (targetNode.is(":focus")) { //checking if the target content was focused
      return false;
    } else {
      targetNode.attr('tabindex', '-1'); //Adding tabindex for elements not focusable
      targetNode.focus(); //Setting focus
    };
  }

  /*******************
   *   > Utilities   *
   ******************/
   /*
   Filter Path
   Filter handling for a /dir/ OR /indexordefault.page
   */
  _filterPath(pathString) {
    return pathString
      .replace(/^\//, '')
      .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
      .replace(/\/$/, '');
  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default SmoothScroll;

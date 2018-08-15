require('./Vendors');
import $ from 'jquery';

import CheckHasTouch from './modules/CheckHasTouch.class';
import NavDisplay from './modules/NavDisplay.class';
import SectionChange from './modules/SectionChange.class';
// import StickyOnScroll from './modules/StickyOnScroll.class'; // disabled, but functional
import ClickToCopy from './modules/ClickToCopy.class';

/****************************************************/
/*                                                 */
/*   App.js                                       */
/*                                               */
/************************************************/
/*

  - Root for all scripts
  - Available features include:
      + Detect touch event on device
      + Modernizr (via ./Vendors.js)
      + Section change on scroll and link click (using class names for active link)
      + Toggle display of menu (using class names)
      + Sticky On Scroll for creating "sticky" elements like banners/headers/menus (using class names)
      + Click To Copy, add the class 'click-to-copy' to an element and it's contents will be copied when clicked.
  - Sticky On Scroll has been disabled because the current design does not require
    any elements to change on scroll, but the module should be functional if desired in future design.


  *************
  * Contents: *
  *************

  # Has No JS
  # Common Vars
  # Detect Touch
  # Navigation Display
  # Section Change
  # Sticky On Scroll (disabled)
  # Click To Copy

*/

/**************************************/
/*   # Has No JS                     */
/************************************/

/*
  Swap JS Indicator Class
  Since we've reached this point, the device must have JS
  so we will swap the has-no-js class for a has-js class.
  This call may be used is CSS to style accordingly.
  (Remember: If an element's display is controlled by js,
  a device may not be able to reach that element if js is
  not enabled.)
*/
document.body.classList.remove('has-no-js');
document.body.classList.add('has-js');

/**************************************/
/*   # Common Vars                   */
/************************************/

let mainNav_block = 'main-nav';
let mainNav_selector = `.${mainNav_block}`;

/**************************************/
/*   # Detect Touch                  */
/************************************/

/*Watch for touch event on device.
When touch event is fired, a has-touch class will replace a has-no-touch class.*/
let checkHasTouch = new CheckHasTouch();
checkHasTouch.detect(); // the watch event is unbound once a touch event is fired.

/**************************************/
/*   # Navigation Display            */
/************************************/

/*
  Create user events to toggle the display of the menu navigation.
  The display is based on class names--thus is dependent on CSS
  for any change in position, visibility, or animations.
*/
let body_visibleMenuClassStr = '--menu-visible';
let mainNav_visibleClassStr = `${mainNav_block}--visible`;
let mainNav_toggleSelectors = [`.site-header__menu-toggle`];
let mainNav_closeSelectors = [`${mainNav_selector}__links`, 'article', '.logo'];
let mainNav_openSelectors = [];

let navDisplay = new NavDisplay(mainNav_selector, mainNav_visibleClassStr, body_visibleMenuClassStr);
navDisplay.setEvents({ // See NavDisplay.class.js for config options.
  toggleSelectors: mainNav_toggleSelectors, // selectors for click to toggle event
  closeSelectors: mainNav_closeSelectors, // selectors for click to close event
  openSelectors: mainNav_openSelectors // selectors for click to open event
});

/**************************************/
/*   # Section Change                */
/************************************/
/*
  Change the active section of content based on which link is clicked or where the user scrolls to.
  This includes:
    - Adding/removing active classes to anchor links
    - Setting the focus to the atice section
    - Changing the section indicator in the body tag (data-section=0)
*/
let section_selector = '.section';
let section_activeLinkClassStr = `active ${mainNav_block}__link--active`;

let sectionChange = new SectionChange(section_selector, section_activeLinkClassStr);
sectionChange.scrollUpOffset = "-5%";
sectionChange.scrollDownOffset="20%";
sectionChange.setEvents();


/**************************************/
/*   # Sticky On Scroll              */
/************************************/

/*
  DEV NOTE:
  The following Sticky On Scroll logic is disabled because it's not used for this design.
  To use: Uncomment the following two lines of code, and uncomment the StickyOnScroll import statement at the top.
  Give your sticky elements the class name 'make-sticky' and a trigger element the class 'trigger-sticky'.
  The sticky elements should receive the class '--sticky' when the user scrolls to the trigger element.
  See the StickyOnScroll module (./modules/StickyOnScroll.class.js) for more information and customization options.
*/
// let stickyOnScroll = new StickyOnScroll();
// stickyOnScroll.execute();

/**************************************/
/*   # Click To Copy                 */
/************************************/

let clickToCopy = new ClickToCopy();
clickToCopy.setEvents();

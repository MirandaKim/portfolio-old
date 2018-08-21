import $ from 'jquery';
import waypoints from '~/node_modules/waypoints/lib/noframework.waypoints';
import SmoothScroll from './SmoothScroll.class';

/****************************************************/
/*                                                 */
/*   Section Change (SectionChange.class.js)      */
/*                                               */
/************************************************/
/*

  - Logic surrounding section/page changes
  - This classes uses the waypoints module for directional scroll triggers
  - Each section is automatically given an index (based on its position)
    and the sections are changed based on that index.
  - Body tag is given a 'going-up' or 'going-down' class based on the scroll direction on section change.
  - Current Features:
      * Add/Remove active class from links based on scroll direction and position.

  ***********
  * Content *
  ***********

    # Constructor

    # Config
      > Scroll Offsets
      > Scroll Animation Time

    # Public
      > Set Events
      > Section

    # Protected
      > Set Top Waypoint
      > Set Section Waypoints
      > Scroll Down Handler
      > Scroll Up Handler
      > Change Section
      > Change Active Link
      > Change Section Indicator
      > Set Animate Scroll

    # Export

*/

class SectionChange {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(sectionSelector = "section", activeLinkClass = "active", activeSectionClass = "section-active") {
    this._atTopClass = "view--at-top"; // class to add to body tag when user is scrolled to the top of the document
    this._atTopOffset = "-10%"; //
    this._scrollDownOffset = "18%";
    this._scrollUpOffset = "-60%";
    this._sections = $(sectionSelector);
    this._activeLinkClass = activeLinkClass; // class to add to an anchor link when it's destination is selected
    this._activeSectionClass = activeSectionClass; // class added to the section in that is active
    this._scrollTime = 1000; // the time in milliseconds it takes to scroll to a selected section

  }

  /**************************************/
  /*   # Config                        */
  /************************************/


  /************************
   *   > Scroll Offsets   *
   ***********************/

   get scrollDownOffset() {
     return this._scrollDownOffset;
   }
   set scrollDownOffset(offsetString){
     this._scrollDownOffset = offsetString;
   }

   get scrollUpOffset(){
     return this._scrollUpOffset;
   }
   set scrollUpOffset(offsetString){
     this._scrollUpOffset = offsetString;
   }

   get atTopClass(){
     return this._atTopClass;
   }
   set atTopClass(classStr){
    this._atTopClass = classStr;
   }

   get atTopOffset(){
     return this._atTopOffset;
   }
   set atTopOffset(offset){
     this._atTopOffset = offset;
   }

   /*******************************
    *   > Scroll Animation Time   *
    ******************************/

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
  setEvents() {
    // Set top indicator waypoint
    this._setTopWaypoint();
    // Set waypoint events
    this._setSectionWaypoints();
    // Set animate scroll
    this._setSmoothScroll();
  }

  /*****************
   *   > Section   *
   ****************/

  section(sectionIndex){
    this._changeSection(sectionIndex);
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /**************************
   *   > Set Top Waypoint   *
   *************************/

   /*
   Set waypoint handler to be triggered
   when the user is scrolled to the top of the document.
   */
   _setTopWaypoint() {
     let downConfig = {
       element: $('body')[0],
       handler: (direction) => {
         this._atTopHandler(direction);
       },
       offset: this._atTopOffset
     };
     new Waypoint(downConfig);
   }

   /*
   Add/remove a class from the body tag
   when the user scrolls to/away from the top of the document.
   */
   _atTopHandler(direction){
     if(direction == "down"){
       document.body.classList.remove(this._atTopClass);
       document.body.classList.add('going-down');
       document.body.classList.remove('going-up');
     }else{
       document.body.classList.add(this._atTopClass);
       document.body.classList.remove('going-down');
       document.body.classList.add('going-up');
     }
   }

  /*******************************
   *   > Set Section Waypoints   *
   ******************************/

   /*
   Set waypoint handlers when a user scrolls in/out of each section.
   Each section is given two handlers:
   one for scolling up, and one for scrolling down.
   */
  _setSectionWaypoints() {
    /*
    Waypoint -- Scroll Down
    */
    for (let i = 0; i < this._sections.length; i++) {
      let downConfig = {
        element: this._sections[i],
        handler: (direction) => {
          if (direction == "down") {
            this._scrollDownHandler(i);
          }
        },
        offset: this._scrollDownOffset
      };
      new Waypoint(downConfig);
      /*
      Waypoint -- Scroll Up
      */
      let upConfig = {
        element: this._sections[i],
        handler: (direction) => {
          if (direction == "up") {
            this._scrollUpHandler(i);
          }
        },
        offset: this._scrollUpOffset
      }
      new Waypoint(upConfig);
    }
  }

  /*****************************
   *   > Scroll Down Handler   *
   ****************************/

   /*
   Scroll down handler:
   - Change active link to the current section
   - Change section indicator (data-section='0')
   - Give body tag the 'going-down' class (remove going-up)

   sectionIndex(int) = the number automatically assigned to the section based on its position.
   */
  _scrollDownHandler(sectionIndex) {
    this._changeSection(sectionIndex);
    document.body.classList.add('going-down');
    document.body.classList.remove('going-up');
  }

  /***************************
   *   > Scroll Up Handler   *
   **************************/

   /*
   Scroll up handler:
   - Change active link to the current section
   - Change section indicator (data-section='0')
   - Give body tag the 'going-up' class (remove going-down)

   sectionIndex(int) = the number automatically assigned to the section based on its position.
   */
  _scrollUpHandler(sectionIndex) {
    this._changeSection(sectionIndex);
    document.body.classList.remove('going-down');
    document.body.classList.add('going-up');
  }

  /************************
   *   > Change Section   *
   ***********************/

   _changeSection(sectionIndex) {
     this._changeActiveSection(sectionIndex);
     this._changeActiveLink(sectionIndex);
     this._changeSectionIndicator(sectionIndex);
   }

  /******************************
  *   > Change Active Section   *
  ******************************/

  _changeActiveSection(sectionIndex){
    this._sections.removeClass(this._activeSectionClass);
    this._sections[sectionIndex].classList.add(this._activeSectionClass);
  }

  /****************************
   *   > Change Active Link   *
   ***************************/

   /*
   Remove the active-link class from all the links,
   then add the active-link class to all the links which point to that section's id.

   sectionIndex(int) = the number automatically assigned to the section based on its position.
   */
  _changeActiveLink(sectionIndex) {
    let sectionId = $(this._sections[sectionIndex]).attr('id');
    $('a').removeClass(this._activeLinkClass);
    $(`a[href="#${sectionId}"]`).addClass(this._activeLinkClass);
  }

  /**********************************
   *   > Change Section Indicator   *
   *********************************/

   /*
   Change the value of the body tag's data-section attribute
   to the indicated index value (sectionIndex)

   sectionIndex(int) = the number automatically assigned to the section based on its position.
   */
   _changeSectionIndicator(sectionIndex){
     $('body').attr('data-section', sectionIndex);
   }

  /****************************
   *   > Set Animate Scroll   *
   ***************************/

   /*
   Use the SmoothScroll module to override the default behavior of an anchor link
   and scroll to the clicked anchor instead of jumping.
   */
  _setSmoothScroll() {
    let smoothScroll = new SmoothScroll();
    smoothScroll.scrollTime = this._scrollTime;
    smoothScroll.setEvents();
  }

}


/**************************************/
/*   # Export                        */
/************************************/

export default SectionChange;

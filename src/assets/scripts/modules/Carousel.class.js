import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Carousel                                     */
/*                                               */
/************************************************/
/*

  - Loop through a collection of items.
  - Carousel includes play and pause feature.
    The controls to trigger the play/pause events are assumed to be within the selected carousel.
    See the constructor function for the play/pause selectors
  - The animations are assumed to be handled by CSS,
    this logic only changes class names based on events.


  *************
  * Contents: *
  *************

  # Constructor
  # Public
      > Enable
      > Play
      > Pause
  # Protected
      > Set Loop Time Event
  # Export

*/

class Carousel {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor() {
    console.log('Carousel Connected');
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

   /***************
   *   > Enable   *
   ***************/

  enable(){
    console.log('Carousel enable test');
  }

  /*************
  *   > Play   *
  *************/

  play(){

  }

  /**************
  *   > Pause   *
  **************/

  pause(){

  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /****************************
  *   > Set Loop Time Event   *
  ****************************/

  setLoopTimeEvent(){

  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default Carousel;

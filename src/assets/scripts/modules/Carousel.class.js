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
  - This manages a single carousel. Each carousel should have its own instance of this class.


  *************
  * Contents: *
  *************

  # Constructor
      > Properties
  # Public
      > Enable
      > Play
      > Pause
  # Protected
      > Initialize Carousel
      > Generate Components
      > Set Events
  # Export

*/

class Carousel {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor() {
    /*******************
    *   > Properties   *
    *******************/

    /*carousel element classes*/
    this.elementClasses = {};
    this.elementClasses.jump = 'carousel__jump';

    /*carousel element selectors*/
    this.elementSelectors = {};
    this.elementSelectors.item = '.carousel__item';

    /*carousel control selectors*/
    this.controlSelectors = {};
    this.controlSelectors.next = '.carousel__move-next';
    this.controlSelectors.previous = '.carousel__move-previous';
    this.controlSelectors.jump = `.${this.elementClasses.jump}`;
    this.controlSelectors.play = '.carousel__play';
    this.controlSelectors.pause = '.carousel__pause';

    /*carousel states*/
    this.states = {};
    this.states.isPlayingClass = "carousel--is-playing";


  }

  /**************************************/
  /*   # Public                        */
  /************************************/

   /***************
   *   > Enable   *
   ***************/

  enable(carouselSelector, beginPlay = true){
    this.carousel = $(carouselSelector);
    this.initializeCarousel();
    if(beginPlay){
      this.play();
    }
  }

  /*************
  *   > Play   *
  *************/

  play(){
    console.log('carousel is playing');
    this.carousel.addClass(this.states.isPlayingClass);
  }

  /**************
  *   > Pause   *
  **************/

  pause(){
    console.log('carousel is paused');
    this.carousel.removeClass(this.states.isPlayingClass);
  }

  /*************
  *   > Next   *
  *************/

  next(){
    console.log('carousel: next slide');
  }

  /*****************
  *   > Previous   *
  *****************/

  previous(){
    console.log('carousel: previous slide');
  }

  /*************
  *   > Jump   *
  *************/

  jump(itemIndex = 0){
    console.log('carousel: jump to item' + itemIndex);
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /****************************
  *   > Initialize Carousel   *
  ****************************/
  initializeCarousel(){

    this.generateComponents();
    this.setPlayEvent();
    this.setPauseEvent();
    this.setNextEvent();
    this.setPreviousEvent();
    this.setJumpEvents();
  }

  /****************************
  *   > Generate Components   *
  ****************************/

  generateComponents (){

  }

  /*******************
  *   > Set Events   *
  *******************/

  setPlayEvent(){
    let playButton = this.carousel.find(this.controlSelectors.play);
    $(playButton).click(()=>{
      console.log('click event: play');
      this.play();
    });
  }

  setPauseEvent(){
    let pauseButton = this.carousel.find(this.controlSelectors.pause);
    $(pauseButton).click(()=>{
      console.log('click event: pause');
      this.pause();
    });
  }

  setLoopTimeEvent(){

  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default Carousel;

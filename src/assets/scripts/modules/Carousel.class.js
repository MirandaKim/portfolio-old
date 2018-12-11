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
      > Next
      > Previous
      > Jump
  # Protected
      > Initialize Carousel
      > Generate Components
      > Set Control Events
      > Change Active
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

    this.carousel;
    this.items = {};
    this.itemCount = 0;
    this.currentItem = 0;

    /*carousel element classes*/
    this.elementClasses = {};
    this.elementClasses.jump = 'carousel__jump';

    /*carousel element selectors*/
    this.elementSelectors = {};
    this.elementSelectors.item = '.carousel__item';
    this.elementSelectors.jumpWrapper = '.carousel__jump-controls';

    /*data attributes*/
    this.itemIndexAttr = 'data-carousel-index';

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
    this.states.isCurrentItemClass = "carousel__item--active";
    this.states.isCurrentJumpClass = "carousel__jump--active";

  }

  /**************************************/
  /*   # Public                        */
  /************************************/

   /***************
   *   > Enable   *
   ***************/

  enable(carouselSelector, beginPlay = true){
    /*get carousel*/
    this.carousel = $(carouselSelector);
    if(this.carousel){
      /*prep carousel: generate elements and set events*/
      this.initializeCarousel();
      /*set the initial active item*/
      this.changeActive(this.currentItem);
      /*begin carousel play if allowed initially*/
      if(beginPlay){
        this.play();
      }
    }else{
      console.log(`Debug: carousel ${carouselSelector} not found.`)
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
    let targetItem = this.currentItem + 1;
    let nextItem =  targetItem >= this.itemCount ? 0 : targetItem;
    this.changeActive(nextItem);
  }

  /*****************
  *   > Previous   *
  *****************/

  previous(){
    let targetItem = this.currentItem - 1;
    let previousItem =  targetItem < 0 ? this.itemCount - 1 : targetItem;
    this.changeActive(previousItem);
  }

  /*************
  *   > Jump   *
  *************/

  jump(itemIndex = 0){
    this.changeActive(itemIndex);
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /****************************
  *   > Initialize Carousel   *
  ****************************/
  initializeCarousel(){
    this.items = this.carousel.find(this.elementSelectors.item)
    this.itemCount = this.items.length;
    if(this.itemCount > 0){
      this.generateComponents();
      this.setEvent_play();
      this.setEvent_pause();
      this.setEvent_next();
      this.setEvent_previous();
      this.setEvent_jump();
    }
  }

  /****************************
  *   > Generate Components   *
  ****************************/

  generateComponents (){
    /*jump control wrapper*/
    let jumpWrapper = this.carousel.find(this.elementSelectors.jumpWrapper);
    /*for each item:*/
    $(this.items).each((i, v) => {
      console.log(i);
      /*give item index attribute*/
      $(v).attr(this.itemIndexAttr, i);
      /*give create jump control for item*/
      let jumpControl = `<div class="${this.elementClasses.jump}" ${this.itemIndexAttr}="${i}"></div>`;
      $(jumpWrapper).append(jumpControl);
    });
    this.jumps = this.carousel.find(this.controlSelectors.jump);
  }

  /***************************
  *   > Set Control Events   *
  ***************************/

  setEvent_play(){
    let playButton = this.carousel.find(this.controlSelectors.play);
    $(playButton).click(()=>{
      this.play();
    });
  }

  setEvent_pause(){
    let pauseButton = this.carousel.find(this.controlSelectors.pause);
    $(pauseButton).click(()=>{
      this.pause();
    });
  }

  setEvent_next(){
    $(this.controlSelectors.next).click(()=>{
      this.next();
    });
  }

  setEvent_previous(){
    $(this.controlSelectors.previous).click(()=>{
      this.previous();
    });
  }

  setEvent_jump(){
    let jumps = this.carousel.find(this.controlSelectors.jump);
    $(jumps).click((e)=>{
      let indexStr = $(e.target).attr(this.itemIndexAttr);
      let indexInt = parseInt(indexStr);
      this.jump(indexInt);
    });
  }

  setEvent_loop(){

  }

  /**********************
  *   > Change Active   *
  **********************/

  changeActive(index){
    /*remove active class from carousel items*/
    $(this.items).removeClass(this.states.isCurrentItemClass);
    $(this.jumps).removeClass(this.states.isCurrentJumpClass);
    /*target new item*/
    let itemSelector = `${this.elementSelectors.item}[${this.itemIndexAttr}=${index}]`;
    let newItem = this.carousel.find(itemSelector);
    /*target new active jump control*/
    let jumpSelector = `${this.controlSelectors.jump}[${this.itemIndexAttr}=${index}]`;
    console.log(jumpSelector);
    let newJump = this.carousel.find(jumpSelector);
    /*add active class to current carousel elements*/
    $(newItem).addClass(this.states.isCurrentItemClass);
    $(jumpSelector).addClass(this.states.isCurrentJumpClass);
    /*set new index*/
    this.currentItem = index;
  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default Carousel;

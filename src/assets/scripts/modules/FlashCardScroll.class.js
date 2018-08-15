import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Flash Card Scroll (FlashCardScroll.class.js) */
/*                                               */
/************************************************/
/*

  - Scroll through section content similar to flipping through flash cards.
  - Content layers are stacked (fixed at top) until focus allows them to scroll up
    and reveal the next content layer.
  - This also requires a css file (_flash-scroll.css)
    with applies the required initial styles to make this function accordingly.
  - To apply feature, add class name to section: flash-scroll (or class name used on construct).
    EXAMPLE: <section class="section flash-scroll"></section>
    note: a section element is not required, but it should be a block element.
  - Public entry point: FlashCardScroll.execute();


  *************
  * Contents: *
  *************

  # Construct

  # Public

  # Protected

*/

class FlashCardScroll {

/**************************************/
/*   # Construct                     */
/************************************/

  construct(featureSelector = '.flash-scroll'){
    this._featureSelector = featureSelector;
  }

/**************************************/
/*   # Public                        */
/************************************/

  execute(){
    
  }

/**************************************/
/*   # Protected                     */
/************************************/


}

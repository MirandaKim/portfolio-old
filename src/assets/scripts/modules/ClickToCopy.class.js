import $ from 'jquery';

/****************************************************/
/*                                                 */
/*   Click To Copy                                */
/*                                               */
/************************************************/
/*

  - Click an element to copy its contents to the clipboard
  - Add the class 'click-to-copy' to an element to apply this behavior.
  - Change the default class by entering your own selector on object construct.
  - Summary: A temporary textarea element is created with the contents of the clicked element as its value.
             The textarea is then 'selected' and its value is copied to the document clipboard.
             The textarea element is then deleted.
  - Original code from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f

  *************
  * Contents: *
  *************

  # Constructor
  # Public
      > Set Events
  # Protected
      > Apply Click To Copy Event
      > Copy Contents To Clipboard
  # Export

/**/

class ClickToCopy {

  /**************************************/
  /*   # Constructor                   */
  /************************************/

  constructor(selector = '.click-to-copy') {
    this.applySelector = selector;
  }

  /**************************************/
  /*   # Public                        */
  /************************************/

  /******************
  *  > Set Events   *
  ******************/

  /*
  Set Events
  Apply the click to copy event to the elements.
  */
  setEvents(){
    this._applyClickToCopyEvent();
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /*********************************
  *  > Apply Click To Copy Event   *
  *********************************/

  /*
  Apply CLick To Copy Event
  Add the click event to the elements that match the selector.
  On click, the element's content will be copied to the clipboard.
  */
    _applyClickToCopyEvent() {
    let nodes = $(this.applySelector);
    nodes.on('click', (clicked) => {
      let value = this._copyContentsToClipboard(clicked);
      console.log('Copied to clipboard: ' + value);
    });
  }

  /**********************************
  *  > Copy Contents To Clipboard   *
  **********************************/

  /*
  Copy Contents To Clipboard
  Copy the contents of an element on to the clipboard

  clicked (node) - the element with content to copy
  returns the value copied
  */
  _copyContentsToClipboard(clicked){
    let value = clicked.target.textContent;
    this._copyToClipboard(value);
    return value;
  }

  /*
  Copy To Clipboard
  Copy the provided text to the clipboard.
  This process creates a temporary textarea with the provided text as its value.
  The document is then able to copy the value of the textarea to the clipboard.
  The temporary textarea is then deleted.

  text (string) - the string value to copy to clipboard
  */
  _copyToClipboard(text){
    let temp = this._createTempElement('textarea', text);
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }


  /*
  Create Temporary Element
  Create a document element with the provided content.
  This element will be hidden from view by its position and is readonly.

  type(string) - the type of element to create (e.g. div, textarea, input, ...)
  content (string) - the value attribute for the element.
  */
  _createTempElement(type, value = ''){
    let temp = document.createElement(type);
    temp.value = value;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    return temp;
  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default ClickToCopy;

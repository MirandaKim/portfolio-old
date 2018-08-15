import $ from 'jquery';
import waypoints from '~/node_modules/waypoints/lib/noframework.waypoints';

/****************************************************/
/*                                                 */
/*   Fix Lazy Waypoints                           */
/*                                               */
/************************************************/
/*

  - Fix waypoints not accounting for images loaded while the user scrolls.
  - Test this is necessary before importing it into App.js
  - Public entry point: FixLazyWaypoints.execute()
  - This should be triggered after all waypoints have been set in other modules.


  *************
  * Contents: *
  *************

  # Constructor

  # Public
    > Execute

  # Protected
    > Refresh Waypoints
    
  # Execute

*/

class FixLazyWaypoints{

  /**************************************/
  /*   # Constructor                   */
  /************************************/

    constructor(lazyLoadSelector = '.lazyload'){
      this.lazyLoadSelector = lazyLoadSelector;
    }

  /**************************************/
  /*   # Public                        */
  /************************************/

  /***************
  *  > Execute   *
  ***************/
  /*
  Trigger the fix on load event
  */
  execute() {
    this._refreshWaypoints();
  }

  /**************************************/
  /*   # Protected                     */
  /************************************/

  /*************************
  *  > Refresh Waypoints   *
  *************************/
  /*
  Refresh waypoints on image load
  */
  _refreshWaypoints(){
    let lazyImgs = $(this.lazyLoadSelector);
    lazyImgs.on('load', () => {
        Waypoint.refreshAll();
    });
  }

}

/**************************************/
/*   # Export                        */
/************************************/

export default FixLazyWaypoints;

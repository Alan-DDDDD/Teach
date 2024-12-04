/**
 * Perfect Scrollbar
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const verticalExample = document.querySelectorAll('.vertical'),
      horizontalExample = document.getElementById('horizontal-example'),
      horizVertExample = document.getElementById('both-scrollbars-example');

    // Vertical Example
    // --------------------------------------------------------------------
    if (verticalExample) {
      verticalExample.forEach(element => {
        new PerfectScrollbar(element, {
          wheelPropagation: false
        });
      });
      // new PerfectScrollbar(verticalExample, {
      //   wheelPropagation: false
      // });
    }

    // Horizontal Example
    // --------------------------------------------------------------------
    if (horizontalExample) {
      new PerfectScrollbar(horizontalExample, {
        wheelPropagation: false,
        suppressScrollY: true
      });
    }

    // Both vertical and Horizontal Example
    // --------------------------------------------------------------------
    if (horizVertExample) {
      new PerfectScrollbar(horizVertExample, {
        wheelPropagation: false
      });
    }
  })();
});

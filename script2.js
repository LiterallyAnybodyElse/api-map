  // draw map
var $map_container = $("#map-container");
var map_ratio = .6;
var state_url = "/";
var R = new ScaleRaphael("usa-map", 1000, 600);
var attr = {
        "stroke": "#000",
        "stroke-opacity": "1",
        "stroke-linejoin": "round",
        "stroke-miterlimit": "4",
        "stroke-width": "1.4",
        "stroke-dasharray": "none",
        "cursor": 'url(https://cdn.custom-cursor.com/db/cursor/32/United_States_ofAmericaFlagCursor.png),auto'
    };
var usRaphael = {};

//draw map and store Raphael paths
for (var state in usMap) {
 // if (window.CP.shouldStopExecution(51)) {
 //       break;
 //   }
  
    // color ballot states blue
    if ($.inArray(state, ballot_states) > -1) {
        attr.fill = '#1976D2'; //blue
    } else if ($.inArray(state, petition_states) > -1) {
        attr.fill = '#689F38'; //green
    } else if ($.inArray(state, vol_states) > -1) {
        attr.fill = '#AFB42B'; //yellow
    } else if ($.inArray(state, write_states) > -1) {
        attr.fill = '#5E35B1'; //purple
    } else if ($.inArray(state, dead_states) > -1) {
        attr.fill = '#444'; //black
    } else {($.inArray(state) > -1)
        attr.fill = '#d3d3d3'; //gray
    }

    attr.state = state;
    usRaphael[state] = R.path(usMap[state].path).attr(attr).data("state", state);
    usRaphael['label'] = [];
  
    // add labels
    var pos = usRaphael[state].getBBox();
    usRaphael['label'][state] = R.text(
        pos.x + (pos.width / 2) + usMap[state].text.x,
        pos.y + (pos.height / 2 + usMap[state].text.y),
        state.toUpperCase()
    ).attr({
        "cursor": 'url(https://cdn.custom-cursor.com/db/cursor/32/United_States_ofAmericaFlagCursor.png),auto',
        "fill": usMap[state].text.color,
        "font-size": 13,
        "font-weight": 'bold',
    }).data("state", state);
    usRaphael['label'][state].toFront();

    // vol states hover to light purple
       if ($.inArray(state, vol_states) > -1) {
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#CFD44B"
            }, 500);
        }, function() {
            this.animate({
                fill: "#AFB42B"
            }, 500);
        });
      //text hover highlight and return for vol states
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#CFD44B"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#AFB42B"
            }, 500);
        });
    } else if (
        //hover highlights ballot states
      $.inArray(state, ballot_states) > -1) {
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#2996F2"
            }, 500);
        }, function() {
            this.animate({
                fill: "#1976D2"
            }, 500);
        });
      //text hover highlight and return for ballot states
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#2996F2"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#1976D2"
            }, 500);
        });
    } else if (
        //hover highlights petition states
      $.inArray(state, petition_states) > -1) {
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#88BF58"
            }, 500);
        }, function() {
            this.animate({
                fill: "#689F38"
            }, 500);
        });
      //text hover highlight and return for petition states
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#A8DF78"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#689F38"
            }, 500);
        });
    } else if (
        //hover highlights write-in states
      $.inArray(state, write_states) > -1) {
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#7E55D1"
            }, 500);
        }, function() {
            this.animate({
                fill: "#5E35B1"
            }, 500);
        });
      //text hover highlight and return for write-in states
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#9E75F1"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#5E35B1"
            }, 500);
        });
    } else if (
        //hover highlights dead states
      $.inArray(state, dead_states) > -1) {
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#222"
            }, 500);
        }, function() {
            this.animate({
                fill: "#444"
            }, 500);
        });
      //text hover highlight and return for dead states
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#000"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#444"
            }, 500);
        });
    } else {
      //regular highlight and return for unassigned states
        usRaphael[state].hover(function() {
            this.animate({
                fill: "#bbb"
            }, 500);
        }, function() {
            this.animate({
                fill: "#d3d3d3"
            }, 500);
        });
        usRaphael['label'][state].hover(function() {
            this.prev.animate({
                fill: "#999"
            }, 500);
        }, function() {
            this.prev.animate({
                fill: "#d3d3d3"
            }, 500);
        });
    }

    // bind click
    usRaphael[state].click(function() {
        window.location.href = state_url + this.data("state").toUpperCase();
    });
    usRaphael['label'][state].click(function() {
        window.location.href = state_url + this.data("state").toUpperCase();
    });

    if (typeof usMap[state].text.hide !== 'undefined' && usMap[state].text.hide === true)
        usRaphael['label'][state].remove();
}

R.changeSize($map_container.width(), $map_container.width() * map_ratio);

$(window).resize(function() {
    R.changeSize($map_container.width(), $map_container.width() * map_ratio);
});     

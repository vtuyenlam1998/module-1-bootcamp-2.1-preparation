// get canvas element.
var elem = document.getElementById('myCanvas');

function collides(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
        var left = rects[i].x, right = rects[i].x+rects[i].w;
        var top = rects[i].y, bottom = rects[i].y+rects[i].h;
        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = rects[i];
        }
    }
    return isCollision;
}

// check if context exist
if (elem && elem.getContext) {
    // list of rectangles to render
    var rects = [{x: 0, y: 0, w: 50, h: 50},
        {x: 75, y: 0, w: 50, h: 50}];
    // get context
    var context = elem.getContext('2d');
    if (context) {

        for (var i = 0, len = rects.length; i < len; i++) {
            context.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
        }

    }

    // listener, using W3C style for example    
    elem.addEventListener('click', function(e) {
        console.log('click: ' + e.offsetX + '/' + e.offsetY);
        var rect = collides(rects, e.offsetX, e.offsetY);
        if (rect) {
            alert('collision: ' + rect.x + '/' + rect.y);
        } else {
            alert('no collision');
        }
    }, false);
}
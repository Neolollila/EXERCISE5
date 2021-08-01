window.onload = function () {

    var canvas = new fabric.Canvas("paint-canvas");
    getChanges();

    canvas.on('mouse:up', (event) => {
        console.log("нажатие");
        sendChange();
    });
    document.getElementById('brush').onclick = function() {
        canvas.isDrawingMode=true;
    };

    document.getElementById('clear').onclick = function() {
        canvas.isDrawingMode=false;
        var obj = canvas.getActiveObject();
        canvas.remove(obj);
        sendChange();
    };

    document.getElementById('text').onclick = function() {
        canvas.isDrawingMode=false;
        var text = new fabric.IText('New text', {
            fill: 'blue',
        });
        canvas.add(text);
        sendChange();
    };
    document.getElementById('todo').onclick = function() {
        canvas.isDrawingMode=false;
        var shape = new fabric.Textbox('New to do \n\n', {
            width: 200,
            height: 200,
            backgroundColor:'yellow'
            ,fontSize: 14,
            editable: true,
            top:0,
            left:0,
            cursorWidth: 0
        });
        canvas.add(shape);
        sendChange();
    };

    setInterval(function() {
        getChanges();
    }, 10000);
    function getChanges() {
        $.ajax({
            url: '/getChange',
            method: 'GET',
            data: {
                text: 'text'
            },
            success: function(data){
                canvas.clear();
                canvas.loadFromDatalessJSON(data);
            }
        });
    }
    function sendChange() {
        $.ajax({
            url: '/sendChange',
            method: 'POST',
            dataType: 'json',
            data: {text: JSON.stringify(canvas)},
            success: function(data){
                console.log(data);
            }
        });
    }
}

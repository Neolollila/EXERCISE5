window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();

    // Specifications
    var input = document.querySelector('input');
    var lem = null;
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'black'; // initial brush color
    context.lineWidth = 2; // initial brush width
    var isDrawing = false;


    // Handle Colors
    var colors = document.getElementsByClassName('colors')[0];

    colors.addEventListener('click', function(event) {
        context.strokeStyle = 'black';
    });

    // Handle Brushes
    var brushes = document.getElementsByClassName('brushes')[0];

    brushes.addEventListener('click', function(event) {
        context.lineWidth = 2;
    });

    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
        setMouseCoordinates(event);
        isDrawing = true;

        // Start Drawing
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
        setMouseCoordinates(event);

        if(isDrawing){
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
        setMouseCoordinates(event);
        isDrawing = false;
    });

    // Handle Mouse Coordinates
    function setMouseCoordinates(event) {
        mouseX = event.clientX - boundings.left;
        mouseY = event.clientY - boundings.top;
    }

    // Handle Clear Button
    var clearButton = document.getElementById('clear');

    clearButton.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Handle Save Button
    var saveButton = document.getElementById('save');

    saveButton.addEventListener('click', function() {
        var imageName = prompt('Please enter image name');
        var canvasDataURL = canvas.toDataURL();
        var a = document.createElement('a');
        a.href = canvasDataURL;
        a.download = imageName || 'drawing';
        a.click();
    });



    document.getElementById('text').onclick = function() {
        lem = 't';
    };

    document.getElementById('todo').onclick = function() {
        lem = 'o';
    };

    document.getElementById('brush').onclick = function() {
        lem = 'zero';
    };
    document.getElementById('clear').onclick = function() {
        lem = 'cl';
    };

    canvas.addEventListener('click', function(event) {
        switch (lem) {
            case 't': {
                context.font = "5px Arial";
                var text = new fabric.Text(input.value, {fill: 'green'});
                canvas.add(text);
                context.fillText(text,mouseX,mouseY);
            }; break;
            case 'o': {
                alert('hello');
            }
            ; break;
        }
    });






    // $("#text").click(function() {
    //     //get input text and process
    // });
    //
    // $("#todo").click(function() {
    //     //get input text and process
    // });
};
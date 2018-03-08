// global variables go here

var clickedArray = [];
var interval = 0;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

// execute functions go here
setup();

// functions definitions go here

function randomNumbers(){
    var numbers = [1,1,2,2,3,3,4,4,5];
    numbers.sort(function(item){
        return .5 - Math.random();
    });
    return numbers;
}

function reveal(cell){
    cell.style.background = "red";
    cell.clicked = true;
    cell.innerHTML = cell.value;
}

function hide(cell){
    cell.style.background = "green";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.background = "orange";
}

function startTimer(){
    if( started == false ){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML =  "Time elapsed " + time;
        },1000);
        started = true;
    }
}

function setup(){
    var grid = document.getElementsByTagName("td");
    var numbers = randomNumbers();

    document.getElementById("restart").addEventListener("click",function(){
        location.reload();
    });

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = numbers[i];

        cell.addEventListener("mouseenter",function(){
            if(this.completed == false && this.clicked == false){
                this.style.background = "yellow";
            }
        });

        cell.addEventListener("mouseleave",function(){
            if(this.completed == false && this.clicked == false){
                this.style.background = "green";
            }
        });

        cell.addEventListener("click",function(){
            if( ready == false)
                return;
            startTimer();   
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }

            if( clickedArray.length == 2 ){
                if( clickedArray[0].value == clickedArray[1].value){
                    // if a matching pair is found
                    complete(clickedArray[0])
                    complete(clickedArray[1]);

                    clickedArray = [];

                    if( numCompleted == 8 ){
                        alert("You won in " + time + "seconds !");
                        clearInterval(interval);
                    }

                }
                else{
                    // if a matching pair is not found
                    ready = false;
                    document.getElementById("grid-table").style.border = "5px solid red";
                    setTimeout(function(){
                    // after a 500ms delay
                    hide(clickedArray[0]);
                    hide(clickedArray[1]);

                    clickedArray = [];

                    ready = true;
                    document.getElementById("grid-table").style.border = "5px solid black";
                    },500);
                }
            }
        });   
    }

    document.addEventListener("keydown",function(){
        if( event.key > 0 && event.key <10){
            grid[event.key -1].click();
        }
    });

}

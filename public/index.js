//variable to store value from url default is 3 is value is unable to retrieve
var boardSize = parseInt(window.location.hash.split('#/')[1] || 3);
//global variable to store id of origin element of the drag item
var dragId = " ";
//global variable to store value of split dragID dat to update state
var splitStateValue = [];
//array to store data of board and square and to render in firebase
var state = [];
var boardElement = document.getElementById('main');

//populating store array to false to avoid any errors in future
for (var i = 0; i < boardSize; i++) {
  state[i] = [];
  for (var j = 0; j < boardSize; j++ ){
      state[i][j] = {value: 0};
  }
}

//function to display the board
render(state);

//storing the firebase object
var firebaseRef = new Firebase("https://tictick.firebaseio.com/state/" + boardSize);

//firebase function for data synch across browser
firebaseRef.on("value", function(snapshot) {
    val = snapshot.val(); //firebase object of state/ containing board info
    if (val) {
      state = val;
      render(state);
    }
});


//function to hold square in a single row
function createRow(i){
  var div_tag = document.createElement('div');
  div_tag.setAttribute("class","row");
  div_tag.setAttribute("id","row-"+i);
  document.getElementById('main').appendChild(div_tag);
}

//function to create blocks
function createSquare(state,i,j){
  var flex_div_tag = document.createElement('div');
  flex_div_tag.setAttribute("class","flex-item-1");
  flex_div_tag.setAttribute("id","item"+i+j);
  flex_div_tag.setAttribute("ondrop","drop(event,state["+i+"]["+j+"],item"+i+j+")");
  flex_div_tag.setAttribute("ondragover","allowDrop(event)");

  document.getElementById('row-'+i).appendChild(flex_div_tag);
}

//function to render the board;
function render(state) {
  boardElement.innerHTML = '';
  for (var i = 0; i < boardSize; i++) {
    createRow(i);
    for (var j = 0; j < boardSize; j++) {
      createSquare(state[i][j],i,j);
      renderState(state[i][j],"item"+i+j,("item"+i+j+1));
    }
  }
}

//function to render the square item when clicked will have a dark background
//and X mark
//argument current state from create, parent id and square id is id to be given
function renderState(square,parentId, squareId) {
    var squareElement = document.getElementById(squareId);
    var parentElement = document.getElementById(parentId);
    if (!squareElement) {
        squareElement = document.createElement('div');
    }

    squareElement.setAttribute('class', 'square');
    squareElement.setAttribute('id', squareId);
    squareElement.setAttribute('draggable', true);
    squareElement.setAttribute('ondragstart', "drag(event)");
    parentElement.appendChild(squareElement);

    if (square.value) {
        squareElement.setAttribute('class', 'square checked');
    }

    squareElement.onclick = handleClick;

    function handleClick() {
        square.value = !square.value;
        setState();
    }
}

//firebase function to set state
function setState() {
    firebaseRef.set(state);
}

//////////////drag and drop/////////////////

//function to allow drop by preventing default behavior of browser
function allowDrop(ev) {
    ev.preventDefault();
}

//function to drag X
function drag(ev) {
   dragId = ev.target.id;
   splitStateValue = dragId.substring(4,6).split('');
   ev.dataTransfer.setData("text", ev.target.id);
}

//function setDrag element
function setDragElement(id,valSplit){
  firstArg = parseInt(valSplit[0]);
  secondArg = parseInt(valSplit[1]);
  state[firstArg][secondArg] = {value: 0};
  setState();
}

//function to drop drag item
function drop(ev,state,what) {
  console.log("in drop");
  //what gives the targeted square element
  //state is targeted state value 
  if(!state.value){
    ev.preventDefault();
    state.value = !state.value;
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data);
    //remove element to avoid duplicate id and creat new one
    element.removeAttribute("id");
    element.setAttribute("id", what.id+1);
    element.removeAttribute("class");
    element.setAttribute("class", "square checked");
    setState();
    ev.target.parentNode.appendChild(element);
    setDragElement(dragId,splitStateValue);

  }//end of if
}
// Used for id'ing the markers for editing and deleting
// better way to do this than a global var
var uid = 0

//Main js function
function selectPain(e) {

  const humanSvg = document.getElementById("human-svg")

  // determine click position
  if (!e) var e = window.event;
    if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }

    //subtract click position from location of the svg in screen
    PosX = PosX - window.scrollX - humanSvg.getBoundingClientRect().left;
    PosY = PosY - window.scrollY - humanSvg.getBoundingClientRect().top;

    // define the marker consisting of a circle and text
    const markerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const markerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');


    markerCircle.setAttributeNS(null, 'cx', PosX);
    markerCircle.setAttributeNS(null, 'cy', PosY);
    markerCircle.setAttributeNS(null, 'r', 15);
    markerCircle.setAttributeNS(null, 'stroke-width', 2);
    markerCircle.setAttributeNS(null, 'stroke', "red");
    markerCircle.setAttributeNS(null, 'fill', "none");
    markerCircle.setAttributeNS(null, 'id', 'markerCircle-' + uid.toString())


    //position of text is hacked based on marker radius size. TODO: Make this cleaner
    markerText.setAttributeNS(null, 'x', PosX - 7.5)
    markerText.setAttributeNS(null, 'y', PosY + 10)
    markerText.setAttributeNS(null, 'class', 'marker-text')
    markerText.setAttributeNS(null, 'id', 'markerText-' + uid.toString())

    //Prmpt for painscore and create text box and assign value to marker
    const painScore = promptPain();
    addTextBox(painScore)
    const markerTextValue = document.createTextNode(painScore);

    markerText.appendChild(markerTextValue)


    humanSvg.appendChild(markerCircle)
    humanSvg.appendChild(markerText)

    //up the unique id by 1 for the next element
    uid +=1

}

// Alert system prompting for pain
//This is hacky. TODO: Make a better modal component to deal with this in a cleaner way
function promptPain(reprompt=false) {
  if(reprompt = true){
    var painScore = prompt("Please just select a number from 0-10");
  } else {
    var painScore = prompt("How bad is the pain from 0-10");
  }
  
  if (Number(painScore) >=0 && Number(painScore) <=10){
    return painScore
  }
  else {
    painScore = promptPain(reprompt=true)
    return painScore
  }
}

//Generate a text box which can be deleted
//TODO: Add an edit button to modify the pain score without deleting
function addTextBox(painScore) {
    var myDiv = document.createElement('div');
    myDiv.id = 'divText-' + uid.toString()
    myDiv.innerHTML = '<input type="text" value="' + painScore + '">'
    let deleteButton = document.createElement("button")
    deleteButton.id = 'delete-' + uid.toString()
    deleteButton.innerHTML = 'delete'
    deleteButton.onclick = deleteInput
    myDiv.appendChild(deleteButton)
    document.getElementById("edit-pain").appendChild(myDiv);
}

function deleteInput(e){
  //TODO: Perhaps a cleaner way to do this
  const uidToDelete = Number(e.toElement.id.split("-")[1])

  document.getElementById('markerText-' + uidToDelete).remove();
  document.getElementById('markerCircle-' + uidToDelete).remove();
  document.getElementById('divText-' + uidToDelete).remove();
}


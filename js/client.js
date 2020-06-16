// Used for id'ing the markers for editing and deleting
// better way to do this than a global var
var uid = 0


function selectPain(e) {
  console.log("svg clicked")
  const humanSvg = document.getElementById("human-svg")

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
    PosX = PosX - window.scrollX - humanSvg.getBoundingClientRect().left;
    PosY = PosY - window.scrollY - humanSvg.getBoundingClientRect().top;

    const markerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const markerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    markerText.setAttributeNS(null, 'x', PosX - 7.5)
    markerText.setAttributeNS(null, 'y', PosY + 10)
    markerText.setAttributeNS(null, 'class', 'marker-text')
    markerText.setAttributeNS(null, 'id', 'markerText-' + uid.toString())


    markerCircle.setAttributeNS(null, 'cx', PosX);
    markerCircle.setAttributeNS(null, 'cy', PosY);
    markerCircle.setAttributeNS(null, 'r', 15);
    markerCircle.setAttributeNS(null, 'stroke-width', 2);
    markerCircle.setAttributeNS(null, 'stroke', "red");
    markerCircle.setAttributeNS(null, 'fill', "none");
    markerCircle.setAttributeNS(null, 'id', 'markerCircle-' + uid.toString())

    const painScore = promptPain();
    addTextBox(painScore)


    const markerTextValue = document.createTextNode(painScore);

    markerText.appendChild(markerTextValue)

    console.log(markerCircle)
    humanSvg.appendChild(markerCircle)
    humanSvg.appendChild(markerText)
    console.log(humanSvg)

    console.log(PosX)
    console.log(PosY)
    console.log("done")

    uid +=1
    console.log(uid)

}

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
  console.log("deleting input")
  console.log(Number(e.toElement.id.split("-")[1]))
  const uidToDelete = Number(e.toElement.id.split("-")[1])

  document.getElementById('markerText-' + uidToDelete).remove();
  document.getElementById('markerCircle-' + uidToDelete).remove();
  document.getElementById('divText-' + uidToDelete).remove();


}


var notes = []

// prepare the xhttp object
var xhttp = new XMLHttpRequest()

// set completion listener
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    notes = JSON.parse(this.responseText)
    redrawNotes()
  }
}

// send the request
xhttp.open("GET", "/notes", true)
xhttp.send()


// set window load listener
window.onload = function (e) {
  var form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()

    var note = {
      content: e.target.elements[0].value
    }

    notes.push(note)
    e.target.elements[0].value = ""
    redrawNotes()
    sendToServer(note)
  } 
}

// redraw notes
function redrawNotes () {
  var ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')

  console.log(notes)
  notes.forEach(function (note) {
    var li = document.createElement('li')

    ul.appendChild(li);
    li.appendChild(document.createTextNode(`${note.content}`))
  })

  var notesElement = document.getElementById("notes")
  if (notesElement.hasChildNodes()) {
    notesElement.removeChild(notesElement.childNodes[0]);
  }
  notesElement.appendChild(ul)
}

// post request to the server
function  sendToServer (note) {
  // post request object
  var xhttpForPost = new XMLHttpRequest()

  // set event listener
  xhttpForPost.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      console.log(this.responseText)
    }
  }

  console.log(note)

  // trigger the post request
  xhttpForPost.open("POST", '/new_note', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}
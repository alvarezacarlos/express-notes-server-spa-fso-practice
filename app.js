const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const notes = [];

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const getController = () => {
  return `<!DOCTYPE html>
        <html>
        <head>
          <link rel="stylesheet" type="text/css" href="./assets/main.css" />
          <script type="text/javascript" src="./assets/main.js"></script>
        </head>
        <body>
          <div class='container'>
            <h1>Notes -- single page app</h1>
            <div id='notes'>
            </div>
            <form id='notes_form'>
              <input type="text" name="note"><br>
              <input type="submit" value="Save">
            </form>
          </div>
        </body>
        </html>
`;
};

app.get("/", (req, res) => {
  const page = getController();
  res.send(page);
});

app.get("/notes", (req, res) => {
  return res.json(notes);
});

app.post("/new_note", (req, res) => {
  console.log(req.body);
  notes.push({ content: req.body.content });
  return res.json({ message: "Note created" });
});

app.listen(3000, () => `Listenning at port 3000`);

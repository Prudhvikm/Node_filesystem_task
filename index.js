const express = require("express"); //inbuilt package
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("this is create timestamp and file");
});

app.get("/createfile", (req, res) => {
  const currentDate = new Date();

  const formatedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
  const formatedTime = currentDate.getHours();

  console.log(formatedDate, formatedTime);
  const fileName = `${formatedDate}_${formatedTime}.txt`;
  console.log(fileName);

  const timestamp = currentDate.toISOString();
  const content = `TimeStamp: ${timestamp}`;
  console.log(content);

  fs.writeFile(`./${fileName}`, content, (err) => {
    if (err) console.log(err);
    console.log(`File: ${fileName} created successfully`);
  });
  res.send({ fileName: fileName });
});

//API 2
app.get("/retrievefile", (req, res) => {
  var result;
  var finalresult = [];
  fs.readdir("./", (err, files) => {
    files.forEach((fileName) => {
      finalresult.push({ fileName: fileName });
    });
    res.send(finalresult);
  });
});

app.listen(PORT, () => console.log("Server started in the port ", PORT));

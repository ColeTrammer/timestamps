"use strict";
const express = require("express");
const app = express();

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

app.get("/", (req, res) => {
    res.send("Enter a unix time or date in the url after a slash to use this service.");
});

app.get("/:date", (req, res) => {
    let date = null;
    const input = req.params.date;
    if (input.match(/\d/g).length == input.length) {
        const milliseconds = parseInt(input, 10) * 1000;
        date = new Date(milliseconds);
    }
    if (date === null) {
        date = new Date(input);
    }
    res.send({
        unix: date.getTime() / 1000,
        natural: getReadableDate(date)
    });
});

app.listen(3000);
//app.listen(process.env.PORT);

function getReadableDate(date) {
    if (date.toString() === "Invalid Date") {
        return null;
    } else {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}

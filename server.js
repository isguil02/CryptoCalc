const express = require("express");
const app = express();

// Serves the public folder automatically
app.use(express.static("public"));

app.get("/students", (req, res) => {
    const students = [
        { id: 1, name: "Alice Johnson", grade: "A" },
        { id: 2, name: "Bob Smith", grade: "B" },
        { id: 3, name: "Carol White", grade: "A" }
    ];
    res.json(students);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
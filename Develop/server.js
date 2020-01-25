const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const exerciseRouter = require("./routes/exercises")

const PORT = process.env.PORT || 6868;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use('/exercise', exerciseRouter);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/workout", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/exercise.html"));
});

app.get("/exercise?", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/workout.html"));
});

app.post("/exercise?", (req, res) => {
    db.workouts.insert(req.body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

// Add exercise to new workout plan 
app.post("/exercise", ({ body }, res) => {
    Exercise.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


// Listen on port 6868
app.listen(6868, () => {
    console.log("App running on port 6868!");
});

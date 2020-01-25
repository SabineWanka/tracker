const router = require('express').Router();
const Exercise = require('../models/workout');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/exercise').post((req, res) => {
    const type = req.body.type;
    const name = req.body.name;
    const duration = Number(req.body.duration);
    const weight = Number(req.body.weight);
    const reps = Number(req.body.reps);
    const sets = Number(req.body.reps);
    const distance = Number(req.body.reps);


    const newExercise = new Exercise({

        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name"
        },
        duration: {
            type: Number,
            required: "Enter an exercise duration in minutes"
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }


    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
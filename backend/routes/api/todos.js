const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const ToDo = require('../../models/todo');

router.post(
    '/create',
    [check('todo', 'todo is required.').not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {todo} = req.body;

        try {
            const newToDo = new ToDo({
                todo
            });
            const toDo = await newToDo.save();
            res.json(toDo);
        } catch (err) {
            console.error(err);
            res.status(500).json({"errors": [{"msg": "Server Error : " + err.toString()}]});
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const toDos = await ToDo.find();
        toDos.length > 0
            ? res.status(200).json(toDos)
            : res.status(200).send([]);
    } catch (err) {
        console.error(err);
        res.status(500).json({"errors": [{"msg": "Server Error : " + err.toString()}]});
    }
});

module.exports = router;

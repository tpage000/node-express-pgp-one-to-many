// NOTES CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Note = require('../models/index').notes;

// routes
router.get('/', (req, res) => {
  db.any(Note.all)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'found all notes' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not get all notes' })
    }); 
});

router.post('/', (req, res) => {
  db.one(Note.add, req.body)
    .then(data => {
      res.status(201).json({ status: 'success', data: data, message: 'created a note!' })
    })
    .catch(err => {
      res.status(400).json({ status: 'failed', err: err.message, message: 'could not create note' })
    });
});

router.put('/:id', (req, res) => {
  req.body.id = req.params.id;
  db.one(Note.update, req.body)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'updated a note' });
    })
    .catch(err => {
      res.status(400).json({ status: 'failure', err: err.message, message: 'failed to update note' });
    })
});

router.delete('/:id', (req, res) => {
  db.one(Note.remove, req.params.id)
    .then(data => {
      res.status(200).json({ status: 'success', data: data, message: 'deleted a note' });
    })
    .catch(err => {
      res.status(400).json({ status: 'failure', err: err.message, message: 'could not delete note' });
    })
});
module.exports = router;

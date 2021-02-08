var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/', (req, res, next) => {
  const { appointmentFromDate, appointmentToDate, name, room } = req.body;
  if (!appointmentFromDate || !appointmentToDate || !name || !room) {
    return res.status(400).json({
      message: 'Booking Date, Name and Room are required',
    });
  }

  const payload = { appointmentFromDate, appointmentToDate, name, room };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.status(400).json(
      { message: 'Room is booked' }
  ));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
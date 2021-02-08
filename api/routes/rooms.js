var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    req.collectionRooms.find({})
      .toArray()
      .then(results => res.json(results))
      .catch(error => res.send(error));
});
  
router.post('/', (req, res, next) => {
    const { room } = req.body;
    if (!room ) {
        return res.status(400).json({
        message: 'Room is required',
        });
    }

    const payload = { room };
    req.collectionRooms.insertOne(payload)
        .then(result => res.json(result.ops[0]))
        .catch(error => res.status(400).json(
            { message: 'Room already exists' }
        ));
});

module.exports = router;
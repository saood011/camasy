const router = require("express").Router();
const passport = require("passport");
const Inventory = require("../../models/Inventory");

const { validateInventoryInput } = require("../../validation/inventory");

// GET
// Get a single room defined by id
/* router.get(
  "/block/:block",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { block } = req.params;

    Room.find({ block })
      .then(room => res.json(room))
      .catch(err =>
        res.status(400).json({ ...err, message: "Failed to fetch rooms" })
      );
  }
); */

// Get all inventory
router.get(
  "/getall",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inventory find");
    Inventory.find()
      .then(item => res.json(item))
      .catch(err =>
        res.status(400).json({ ...err, message: "Failed to fetch inventory" })
      );
  }
);

// POST
// Create a inventory/////////////////////////////////////////////////////////////////////////////////////////////
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateInventoryInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    console.log(req.body);
    const newInventory = new Inventory(req.body);

    newInventory
      .save()
      .then(data =>
        res.json({ success: true, message: "Item has been added." })
      )
      .catch(err =>
        res.status(400).json({ ...err, message: "Error while adding item." })
      );
  }
);

// PUT
// Assign a cleaner to a given room id
// router.put('/incharge/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
//   const { errors, isValid } = validateCleanerInput(req.body)
//   if(!isValid) return res.status(400).json(errors)

//   const { incharge } = req.body;
//   const { id } = req.params;

//   Room.findOneAndUpdate(id, {$set: { incharge }})
//     .then(data => res.json({success: true, message: 'Incharge has been updated.'}))
//     .catch(err => res.status(400).json({...err, message: 'Failed to update the incharge'}))
// })

// Assign room to a studnet

// router.put('/assign', passport.authenticate('jwt', {session: false}), (req, res) => {
//   const { errors, isValid } = validateStudentInput(req.body)
//   if(!isValid) return res.status(400).json(errors)
//   // studentIds is an array of college Ids and roomid is the room number
//   const { studentIds, roomId } = req.body;
//   Room.findOneAndUpdate({id: roomId}, { students: studentIds })
//     .then(data => res.json({ success: true, message: 'Student has been added to the provided room.'}))
//     .catch(err => res.json({...err, message: 'Failed to assign student to the room.'}))
// })

// DELETE

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, item } = req.body;
    console.log(id);
    Inventory.findOneAndDelete({ _id: id })
      .then(data =>
        res.json({
          message: `Item "${item}" has been deleted`,
          success: true
        })
      )
      .catch(err =>
        res.json({
          messgae: "Failed to remove the student",
          ...err,
          success: false
        })
      );
  }
);

module.exports = router;

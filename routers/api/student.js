const router = require("express").Router();
const passport = require("passport");
const sendMail = require("../../client/src/sendmail");

// Student models
const Student = require("../../models/Student");
const Attendance = require("../../models/Attendance");

const StudentValidation = require("../../validation/student");

// POST

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email, id } = req.body;

    const { errors, isValid } = StudentValidation(req.body);

    if (!isValid) return res.status(400).json(errors);

    Student.findOne({
      $or: [{ email }, { id }],
    }).then((currentUser) => {
      if (currentUser) {
        res
          .status(400)
          .json({ error: "Student with this id or email already exists." });
      } else {
        const newStudent = new Student(req.body);
        const newAttend = new Attendance({
          name: req.body.name,
          studentId: req.body.id,
          title: "Registered",
          color: "blue",
          allDay: "false",
        });
        //saving new attendance
        newAttend.save();
        //pushing new attendance to the student attendance array
        newStudent.attendances.push(newAttend);
        //saving student
        newStudent
          .save()
          .then((student) => {
            res.json(student);
          })
          .catch((err) =>
            res
              .status(500)
              .json({ error: "Failed to save new student in the DB", err })
          );
      }
    });
  }
);

// GET

// Get a list of students with a given batch
router.get(
  "/batch/:batch",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { batch } = req.params;

    Student.find({ batch })
      .then((students) => res.json(students))
      .catch((err) => console.log({ error: "Failed to fetch students", err }));
  }
);
// Get a single student with a given student id
router.get(
  "/studentID/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    Student.find({ _id: id })
      .populate("attendances")
      .exec((err, student) => {
        if (err) {
          throw err;
        } else {
          res.json(student);
          console.log(student);
        }
      });
  }
);
//  handle date click from ####mycalendar

router.post(
  "/attend/addAttendance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { start, _id, name, studentId, title, end, color } = req.body;
    //creating new attendance
    const newAttend = new Attendance({
      name,
      studentId,
      start,
      title,
      end,
      color,
    });
    newAttend.save();
    //search student by id and pushing new attendance to the given student's attendances array
    Student.findByIdAndUpdate({ _id }, { $push: { attendances: newAttend } })
      .then((res) => console.log(res))
      .catch((err) => res.send(err));
  }
);

// Get a list of student with a given room
router.get(
  "/room/:room",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { room } = req.params;

    Student.find({ room })
      .then((students) => res.json(students))
      .catch((err) => console.log({ error: "Failed to fetch students", err }));
  }
);

// Get a student with a given ID
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    Student.find({ id })
      .then((students) => res.json(students))
      .catch((err) => console.log({ error: "Failed to fetch students", err }));
  }
);
router.get(
  "/single/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    Student.find({ id })
      .then((students) => res.json(students))
      .catch((err) => console.log({ error: "Failed to fetch students", err }));
  }
);

router.get("/all", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) =>
      res.status(400).json({ ...err, message: "Failed to fetch all students" })
    );
});

// PUT

// Update student availability
router.put(
  "/availability",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, isAvailable } = req.body;

    Student.findOneAndUpdate({ _id: id }, { $set: { isAvailable } })
      .then((data) => {
        if (isAvailable) {
          console.log(isAvailable);
          Attendance.findOneAndUpdate(
            { studentId: data.id },
            { $set: { title: "present" } }
          ).then((data2) => console.log(data2));
        } else {
          Attendance.findOneAndUpdate(
            { studentId: data.id },
            { $set: { title: "absent" } }
          ).then((data2) => console.log(data2));
        }
        res.status(200).json({
          message: "Student availability has been updated.",
          success: true,
        });
      })
      .catch((err) =>
        res.json({ ...err, message: "Failed to update student status." })
      );
  }
);

// DELETE

// Delete a student with a student ID
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.body;
    Student.findOneAndDelete({ id })
      .then((data) =>
        res.json({
          message: `Student with ID ${id} has been deleted`,
          success: true,
        })
      )
      .catch((err) =>
        res.json({
          messgae: "Failed to remove the student",
          ...err,
          success: false,
        })
      );
  }
);
// send email
router.post("/sendemail", (req, res) => {
  sendMail(req.body.Email, req.body.subject, req.body.message, function (
    err,
    data
  ) {
    if (err) {
      console.log("Internal Error" + err);
    } else {
      res.send(`Email Sent Successfully!`);
      console.log("Email sent");
    }
  });
});
// Delete route for attendance EVENT
router.delete(
  "/attend/addAttendance/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.body;

    console.log("delete id" + id);
    Attendance.findOneAndDelete({ _id: id })
      .then((data) =>
        res.json({
          message: `Attendance with ID ${id} has been deleted`,
          success: true,
        })
      )
      .catch((err) =>
        res.json({
          messgae: "Failed to remove the student",
          ...err,
          success: false,
        })
      );
  }
);

module.exports = router;

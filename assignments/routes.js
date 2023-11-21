import db from "../Database/index.js";

function AssignmentRoutes(app) {

  app.post("/api/courses/:cid/assignments", (req, res) => {
    try {
      const { cid } = req.params;
      const newAssignment = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      db.assignments.push(newAssignment);
      res.send(newAssignment);
    } catch (error) {
      console.error("Error handling POST assignment request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    try {
      const { aid } = req.params;
      db.assignments = db.assignments.filter((a) => a._id !== aid);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling DELETE assignment request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.put("/api/assignments/:aid", (req, res) => {
    try {
      const { aid } = req.params;
      const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body
      };
      res.sendStatus(204);
    } catch (error) {
      console.error("Error handling PUT assignment request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    try {
      const { cid } = req.params;
      const assignments = db.assignments.filter((a) => a.course === cid);
      res.send(assignments);
    } catch (error) {
      console.error("Error handling GET assignments request:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

export default AssignmentRoutes;

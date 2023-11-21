import Database from "../Database/index.js";

function CourseRoutes(app) {
  app.get("/api/courses/:id", (req, res) => {
    try {
      const { id } = req.params;
      const course = Database.courses.find((c) => c._id === id);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      res.send(course);
    } catch (error) {
      console.error("Error handling GET request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.put("/api/courses/:id", (req, res) => {
    try {
      const { id } = req.params;
      const course = req.body;
      Database.courses = Database.courses.map((c) =>
        c._id === id ? { ...c, ...course } : c
      );
      res.sendStatus(204);
    } catch (error) {
      console.error("Error handling PUT request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/api/courses/:id", (req, res) => {
    try {
      const { id } = req.params;
      Database.courses = Database.courses.filter((c) => c._id !== id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error handling DELETE request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/api/courses", (req, res) => {
    try {
      const course = { ...req.body, _id: new Date().getTime().toString() };
      Database.courses.push(course);
      res.send(course);
    } catch (error) {
      console.error("Error handling POST request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/courses", (req, res) => {
    try {
      const courses = Database.courses;
      res.send(courses);
    } catch (error) {
      console.error("Error handling GET all courses request:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

export default CourseRoutes;

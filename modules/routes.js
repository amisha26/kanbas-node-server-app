import db from "../Database/index.js";

function ModuleRoutes(app) {

  app.post("/api/courses/:cid/modules", (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      db.modules.push(newModule);
      res.send(newModule);
    } catch (error) {
      console.error("Error handling POST module request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/api/modules/:mid", (req, res) => {
    try {
      const { mid } = req.params;
      db.modules = db.modules.filter((m) => m._id !== mid);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling DELETE module request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.put("/api/modules/:mid", (req, res) => {
    try {
      const { mid } = req.params;
      const moduleIndex = db.modules.findIndex((m) => m._id === mid);
      db.modules[moduleIndex] = {
        ...db.modules[moduleIndex],
        ...req.body,
      };
      res.sendStatus(204);
    } catch (error) {
      console.error("Error handling PUT module request:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    try {
      const { cid } = req.params;
      const modules = db.modules.filter((m) => m.course === cid);
      res.send(modules);
    } catch (error) {
      console.error("Error handling GET modules request:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

export default ModuleRoutes;

import courses from "./courses.json" assert {type: "json"};
import modules from "./modules.json" assert {type: "json"};;
import assignments from "./assignments.json" assert {type: "json"};;
// import users from "./users.json";
// import grades from "./grades.json";
// import enrollments from "./enrollments.json";

const database = {
  courses,
  modules,
  assignments,
  // users,
  // grades,
  // enrollments,
};

export default database;

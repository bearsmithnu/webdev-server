import express from "express";
import Hello from "./Hello";
import Lab5 from "./Lab5/index";
import cors from "cors";
import db from "./Kambaz/Database/index";
import UserRoutes from "./Kambaz/Users/routes";
import CourseRoutes from "./Kambaz/Courses/routes";
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from "./Kambaz/Modules/routes";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes";
import AssignmentRoutes from "./Kambaz/Assignments/routes";

const app = express();

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL, "http://localhost:3000"],
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions["proxy"] = true;
  sessionOptions["cookie"] = {
    sameSite: "none",
    secure: true
  };
}

app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app, db);
CourseRoutes(app, db);
EnrollmentsRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
app.listen(process.env.PORT || 4000);
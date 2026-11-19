import EnrollmentsDao from "./dao";
import UsersDao from "../Users/dao";
import CoursesDao from "../Courses/dao";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const usersDao = UsersDao(db);
    const coursesDao = CoursesDao(db);

    const enroll = (req, res) => {
        const { userId, courseId } = req.params;
        if (!usersDao.findUserById(userId) || !coursesDao.findCourseById(courseId)) {
            // "Not allowed." because their request was malformed. 
            res.sendStatus(401);
            return;
        }

        if (dao.enrollIntoCourse(userId, courseId)) {
            // "Created".
            res.sendStatus(201);
            return;
        }
        // "No content". Already had this enrollment.
        res.sendStatus(204);
    };

    const unenroll = (req, res) => {
        const { userId, courseId } = req.params;

        if (dao.unenrollFromCourse(userId, courseId)) {
            // "No content". Success.
            res.sendStatus(204);
            return;
        }
        // "OK". Enrollment did not exist to begin with.
        res.sendStatus(200);
    };

    app.put("/api/users/:userId/courses/:courseId", enroll);
    app.delete("/api/users/:userId/courses/:courseId", unenroll);

}
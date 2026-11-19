import AssignmentsDao from "./dao";
export default function AssignmentRoutes(app, db) {
    const dao = AssignmentsDao(db);
    const findAssignmentsForCourse = (req, res) => {
        res.json(dao.findAssignmentsForCourse(req.params.courseId));
    };
    const createAssignmentForCourse = (req, res) => {
        const created = dao.createAssignment({
            ...req.body,
            course: req.params.courseId,
        });
        res.json(created);
    };
    const updateAssignment = (req, res) => {
        res.json(dao.updateAssignment(req.params.assignmentId, req.body));
    };
    const deleteAssignment = (req, res) => {
        if (dao.deleteAssignment(req.params.assignmentId)) {
            res.sendStatus(204);
            return;
        }
        res.sendStatus(200);        
    };
    
    const findAssignmentById = (req, res) => {
        res.json(dao.findAssignmentById(req.params.assignmentId));
    }

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
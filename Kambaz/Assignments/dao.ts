import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
    const findAssignmentsForCourse = (courseId) =>
        db.assignments.filter((assignment) => assignment.course === courseId);

    const createAssignment = (assignment) => {
        const created = { ...assignment, _id: uuidv4() };
        db.assignments = [...db.assignments, created];
        return created;
    };

    const updateAssignment = (assignmentId, updates) => {
        const assignment = db.assignments.find((item) => item._id === assignmentId);
        Object.assign(assignment, updates);
        return assignment;
    };

    const deleteAssignment = (assignmentId) => {
        const { assignments } = db;
        const assnIndex = assignments.findIndex((a) => a._id === assignmentId);
        if (assnIndex === -1) {
            return false;
        }
        assignments.splice(assnIndex, 1);
        return true;
    };

    const findAssignmentById = (assignmentId) => {
        const { assignments } = db;
        console.log("here");
        console.log(assignments.find((a) => a._id === assignmentId));
        return assignments.find((a) => a._id === assignmentId);
    };

    return {
        findAssignmentsForCourse,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        findAssignmentById
    };
};
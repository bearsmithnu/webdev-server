import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    const { enrollments } = db;

    function findEnrollmentsInCourse(courseId) {
        return enrollments.filter((e) => e.course === courseId);
    }

    function enrollIntoCourse(userId, courseId) {
        if (enrollments.find((e) => e.user === userId && e.course === courseId)) {
            return false;
        }
        enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
        return true;
    }

    function unenrollFromCourse(userId, courseId) {
        const eIdx = enrollments.findIndex((e) => e.user === userId && e.course === courseId);
        if (eIdx !== -1) {
            enrollments.splice(eIdx, 1);
            // Successfully removed.
            return true;
        }
        // No matching enrollment exists.
        return false;
    }

    return { findEnrollmentsInCourse, enrollIntoCourse, unenrollFromCourse };
}


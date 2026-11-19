const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const module = {
    id: 0,
    name: "Annotated bibliography",
    description: "Learn to annotate some sources in MLA, APA, and Chicago styles",
    course: "ENGW3315",
};

export default function WorkingWithRemoteObjects(app) {
    const getAssignment = (req, res) => {
        res.json(assignment);
    };
    const getAssignmentTitle = (req, res) => {
        res.json(assignment.title);
    };
    const setAssignmentTitle = (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    };
    const setAssignmentScore = (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    };
    const setAssignmentCompleted = (req, res) => {
        assignment.completed = true;
        res.json(assignment);
    };
    const setAssignmentIncomplete = (req, res) => {
        assignment.completed = false;
        res.json(assignment);
    };

    const getModule = (req, res) => {
        res.json(module);
    };
    const getModuleName = (req, res) => {
        res.json(module.name);
    };
    const setModuleName = (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    };
    const setModuleDesc = (req, res) => {
        const { desc } = req.query;
        module.description = desc;
        res.json(module);
    };

    app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
    app.get("/lab5/assignment/title", getAssignmentTitle);
    app.get("/lab5/assignment", getAssignment);
    app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
    app.get("/lab5/assignment/completed", setAssignmentCompleted);
    app.get("/lab5/assignment/incomplete", setAssignmentIncomplete);

    app.get("/lab5/module", getModule);
    app.get("/lab5/module/name", getModuleName);
    app.get("/lab5/module/name/:newName", setModuleName);
    app.get("/lab5/module/desc", setModuleDesc);

}
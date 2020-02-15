const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = express.Router();

const FileController = require("./controllers/FileController");

//Controllers
const CollaboratorController = require("./controllers/CollaboratorController");
const KidController = require("./controllers/KidController");
const ParentController = require("./controllers/ParentController");
const VisitController = require("./controllers/VisitController");
const ContactAttemptController = require("./controllers/ContactAttemptController");
const EventController = require("./controllers/EventController");
const IncidentController = require("./controllers/IncidentController");
const IncidentKidController = require("./controllers/IncidentKidController");

routes.get("/", (req, res) => res.send("Server OK!"));
routes.get("/files/:file", FileController.show);

routes.post("/login", CollaboratorController.login);

//Define que todo acesso a API deve ser por um usuário logado
routes.use("/api", CollaboratorController.logged);

//Define que toda acesso a API/NEW deve ser por um usuário ADM
routes.use("/api/new", CollaboratorController.isADM);

routes.get("/api/collaborator", CollaboratorController.index);
routes.post("/api/new/collaborator", upload.single("avatar"), CollaboratorController.add );

routes.get("/api/parent", ParentController.index);
routes.post("/api/parent/new", upload.single("avatar"), ParentController.add);
//routes.post("/api/parent/new", ParentController.add);

routes.get("/api/kid", KidController.index);
routes.post("/api/kid/new", upload.single("avatar"), KidController.add);

routes.get("/dash", VisitController.index);
routes.get("/api/wait", VisitController.wait);
routes.get("/api/past", VisitController.past);
routes.get("/api/visit", VisitController.index);
routes.post("/api/visit/new", VisitController.add);
routes.post("/api/visit/in", VisitController.in);
routes.post("/api/visit/out", VisitController.out);
routes.post("/api/visit/cancelOut", VisitController.cancelOut);
routes.post("/api/visit/bracelet", VisitController.kidBracelet);

routes.get("/api/contactAttempt", ContactAttemptController.index);
routes.post("/api/contactAttempt/new", ContactAttemptController.add);

routes.get("/api/event", EventController.index);
routes.post("/api/new/event", EventController.add);

routes.get("/api/incident", IncidentController.index);
routes.post("/api/new/incident", IncidentController.add);

routes.get("/api/incidentkid", IncidentKidController.index);
routes.post("/api/incidentkid/new", IncidentKidController.add);

module.exports = routes;

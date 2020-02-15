const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const CollaboratorController = require('./app/controllers/CollaboratorController');
const ParentController = require('./app/controllers/ParentController');
const KidController = require('./app/controllers/KidController');
const VisitController = require('./app/controllers/VisitController');
const FileController = require('./app/controllers/FileController');

routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');

    return next();
});

routes.get('/files/:file', FileController.show);


routes.get('/', guestMiddleware, (req, res) => res.render('auth/signin'))
routes.post('/signin', CollaboratorController.login);


routes.get('/app/logout', CollaboratorController.logout);

routes.use('/app', authMiddleware)

routes.get('/app/colaboradores', CollaboratorController.index)
routes.get('/app/colaboradores/new', (req, res) => res.render('auth/signup'))
routes.post('/app/colaboradores/new', upload.single('avatar'), CollaboratorController.add);

routes.get('/app/responsaveis', ParentController.index)
routes.get('/app/responsaveis/new', (req, res) => res.render('auth/signup'))
routes.post('/app/responsaveis/new', upload.single('avatar'), ParentController.add);

routes.get('/app/criancas', KidController.index)
routes.get('/app/criancas/new', (req, res) => res.render('auth/signup'))
routes.post('/app/criancas/new', upload.single('avatar'), KidController.add);

routes.get('/app/dashboard', VisitController.index)


module.exports = routes
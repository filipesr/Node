import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Servidor online!' }));

export default routes;

import {Router} from "express";
import pedidoController from "../controllers/pedidoController.js";
const pedidoRoutes = Router(); 

pedidoRoutes.post('/', pedidoController.criar)
pedidoRoutes.get('/', pedidoController.selecionar)
pedidoRoutes.get('/:id', pedidoController.selecionar)
export default pedidoRoutes;
const { Router } = require('express')
const RoleController = require('../controllers/roleController')

const router = Router();

router
  .post('/roles', RoleController.cadastrar)
  .get('/roles', RoleController.listar)
  .get('/roles/:id', RoleController.buscarPorId)
  .put('/roles/:id', RoleController.alterar)
  .delete('/roles/:id', RoleController.deletar)

module.exports = router;
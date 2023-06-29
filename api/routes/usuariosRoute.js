const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../middlewares/autenticado')

const router = Router();

router.use(autenticado)

router
    .post('/usuarios', UsuarioController.cadastrar)
    .get('/usuarios', UsuarioController.listar)
    .get('/usuarios/:id', UsuarioController.buscarPorId)
    .put('/usuarios/:id', UsuarioController.alterar)
    .delete('/usuarios/:id', UsuarioController.deletar);

module.exports = router;
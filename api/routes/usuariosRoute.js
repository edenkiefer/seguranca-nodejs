const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../middlewares/autenticado')

const router = Router();

router
    .post('/usuarios', UsuarioController.cadastrar);

router.use(autenticado);

router
    .get('/usuarios', UsuarioController.listar)
    .get('/usuarios/:id', UsuarioController.buscarPorId)
    .put('/usuarios/:id', UsuarioController.alterar)
    .delete('/usuarios/:id', UsuarioController.deletar);

module.exports = router;
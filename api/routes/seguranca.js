const { Router } = require('express')
const SegurancaController = require('../controllers/segurancaController');

const router = Router();

// acl = Access control list
router
  .post('/seguranca/acl', SegurancaController.cadastrarAcl)
  .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)

module.exports = router;
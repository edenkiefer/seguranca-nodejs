const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body
    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha })
      res.status(201).send(usuario);
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }

  static async listar(req, res) {
    try {
      const usuarios = await usuarioService.listar();
      return res.status(200).send(usuarios);
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }

  static async buscarPorId(req, res) {
    const { id } = req.params
    try {
      const usuarios = await usuarioService.buscarPorId(id);
      return res.status(200).send(usuarios);
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }

  static async alterar(req, res) {
    const { id } = req.params;
    const dto = req.body;
    try {
      const usuario = await usuarioService.alterar(dto, id);
      return res.status(200).send(usuario);
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletar(id);
      return res.status(200).send({ message: 'Usuário removido com sucesso.'});
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
  }

}

module.exports = UsuarioController;
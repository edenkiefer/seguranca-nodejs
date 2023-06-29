const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({ 
      where: { 
        email: dto.email 
      } 
    })

    if (usuario) {
      console.log(usuario)
      throw new Error('Usuário já cadastrado')
    }

    try {
      const senhaHash = await hash(dto.senha, 8)

      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash
      })

      return novoUsuario;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuario')
    }
  }

  async listar(condicao = {}) {
    const usuarios = await database.usuarios.findAll({ where: { ...condicao } });
    return usuarios;
  }

  async buscarPorId(id) {
    const usuario = await database.usuarios.findOne({ where: { id: id } });
    return usuario;
  }

  async alterar(dto, id) {
    await database.usuarios.update(dto, { where: { id: id } });
    const usuario = await database.usuarios.findOne({ where: { id: id } });
    return usuario;
  }

  async deletar(id) {
    await database.usuarios.destroy({ where: { id: id } });
  }

}

module.exports = UsuarioService
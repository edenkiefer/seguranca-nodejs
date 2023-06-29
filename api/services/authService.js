const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class AuthService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email
      }
    })

    if (!usuario)
      throw new Error('Usuario não cadastrado')

    const comparaSenhas = await compare(dto.senha, usuario.senha);

    if (!comparaSenhas) 
      throw new Error('Usuário ou senha invalidos.')
    
    const accessToken = sign({ 
      id: usuario.id,
      email: usuario.email
     }, process.env.SECRET, {
      expiresIn: 86400
     })

    return { accessToken };
  }

}

module.exports = AuthService;
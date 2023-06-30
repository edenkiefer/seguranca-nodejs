const database = require('../models');
const uuid = require('uuid')

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne(
      {
        where: {
          nome: dto.nome
        }
      }
    )

    if (role) {
      throw new Error('Role já cadastrada')
    }

    try {
      const newRole = database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      })

      return newRole;
    } catch (error) {
      throw new Error('Erro ao cadastrar Role')
    }
  }

  async listar(condicao = {}) {
    try {
      const roles = await database.roles.findAll({ where: { ...condicao } })
      return roles;
    } catch (error) {
      throw new Error(error);
    }
  }

  async buscarPorId(id) {
    try {
      const role = await database.roles.findOne({ where: { id: id } })

      if(!role)
        throw new Error('Role não encontrada')

      return role;
    } catch (error) {
      throw new Error(error);
    }
  }

  async alterar(dto, id) {
    const role = await this.buscarPorId(id);

    if (!role)
      throw new Error('Role não encontrada')

    try {
      role.nome = dto.nome ? dto.nome : role.nome
      role.descricao = dto.descricao ? dto.descricao : role.descricao
      
      await role.save();

      return await role.reload();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletar (id) {
    const role = await this.buscarPorId(id);

    if(!role)
      throw new Error('Role não encontrada')

    try {
      await database.roles.destroy({ where: { id: id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = RoleService;
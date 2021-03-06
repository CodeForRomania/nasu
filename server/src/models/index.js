import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.TEST_DB || 'nasu', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true
  }
})

const models = {
  User: sequelize.import('./user'),
  Feature: sequelize.import('./feature')
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize
models.op = Sequelize.Op

export default models

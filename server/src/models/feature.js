export default (sequelize, DataTypes) => {
  const Feature = sequelize.define('feature', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  })

  Feature.associate = models => {
    // 1:M
    Feature.belongsToMany(models.User, {
      through: 'feature_user',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    })
  }

  return Feature
}

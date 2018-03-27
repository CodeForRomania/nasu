import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'

export default {
  Feature: {},
  Query: {
    allFeatures: (parent, args, { models }) => models.Feature.findAll(),
    getUserFeatures: requiresAuth.createResolver((parent, args, { models, user }) =>
      models.sequelize.query(
        'select distinct on (u.id) u.id, u.username from users as u join feature_user as fu on (u.id = fu.user_id) where (:currentUserId = fu.user_id)',
        {
          replacements: { currentUserId: user.id },
          model: models.User,
          raw: true
        }
      )
    )
  },
  Mutation: {
    createFeature: async (parent, args, { models }) => {
      try {
        const feature = await models.Feature.create(args)
        return {
          ok: true,
          feature
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        }
      }
    }
  }
}

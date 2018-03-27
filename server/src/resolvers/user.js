import { tryLogin } from '../auth'
import formatErrors from '../formatErrors'
import requiresAuth from '../permissions'

export default {
  User: {},
  Query: {
    getUser: (parent, { userId }, { models }) => models.User.findOne({ where: { id: userId } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
    me: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      const { dataValues } = await models.User.findOne({ where: { id: user.id } })
      const features = ['aa']
      return {
        ...dataValues,
        features
      }
    })
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args)

        return {
          ok: true,
          user
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

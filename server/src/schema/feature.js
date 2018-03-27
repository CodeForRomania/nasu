export default `

  type Feature {
    id: Int!
    name: String!
  }

  type UserFeaturesResponse {
    ok: Boolean!
    features: [Feature!]
    errors: [Error!]
  }

  type CreateFeatureResponse {
    ok: Boolean!
    feature: Feature
    errors: [Error!]
  }

  type Query {
    allFeatures: [Feature!]!
    getUserFeatures(userId: Int!): UserFeaturesResponse
  }

  type Mutation {
    createFeature(name: String!): CreateFeatureResponse!
  }
`

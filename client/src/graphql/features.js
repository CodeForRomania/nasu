import gql from 'graphql-tag'

export const meQuery = gql`
  {
    me {
      id
      username
      features
    }
  }
`

export const getTeamMembersQuery = gql`
  query($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`

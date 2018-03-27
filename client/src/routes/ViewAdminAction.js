import React from 'react'
import { compose, graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import gql from 'graphql-tag'

import Header from '../components/Header'
import AppLayout from '../components/AppLayout'
import Sidebar from '../containers/Sidebar'
import { meQuery } from '../graphql/features'

const ViewAdminFeatures = ({
  mutate,
  data: { loading, me },
  match: { params: { teamId, channelId } }
}) => {
  if (loading || !me) {
    return null
  }

  const { id: currentUserId, username, features } = me
  console.log(username, features, currentUserId)

  return (
    <AppLayout>
      <Sidebar
        actions={features.map(f => ({
          id: f.id,
          name: f.name.toUpperCase()
        }))}
        username={username}
      />
    </AppLayout>
  )
}

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`

export default compose(
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(createMessageMutation)
)(ViewAdminFeatures)

import React from 'react'

import UserFeatures from '../components/UserFeatures'

export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  }

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault()
    }
    this.setState(state => ({ openAddChannelModal: !state.openAddChannelModal }))
  }

  render() {
    const { actions = [], username, cursor } = this.props
    const { openInvitePeopleModal, openAddChannelModal, openDirectMessageModal } = this.state

    return [<UserFeatures key="action-sidebar" actions={actions} />]
  }
}

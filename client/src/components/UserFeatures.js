import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ActionWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`

const ActionList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`

const ActionListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`

const feature = ({ id, name }) => (
  <Link key={`user-feature-${id}`} to={`/view-user-feature/${id}`}>
    <ActionListItem>{name}</ActionListItem>
  </Link>
)

export default ({ features = [] }) => (
  <ActionWrapper>
    <ActionList>{features.map(feature)}</ActionList>
  </ActionWrapper>
)

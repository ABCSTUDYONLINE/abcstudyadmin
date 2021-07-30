/* eslint-disable no-unused-vars */
import React from 'react'
import { withRouter } from 'react-router-dom'
import TableUsers from './components/TableUsers'
import PageHeader from '../../components/PageHeader'
function Users () {
  return (
    <div>
        <PageHeader title="Users management"/>
        <TableUsers/>
    </div>
  )
}

export default withRouter(Users)

import React from 'react';
import {withRouter} from 'react-router-dom'
import TableUsers from './components/TableUsers'
import PageHeader from '../../components/PageHeader'
function Users() {
  
  return (
    <div>
        <PageHeader title="Table Users"/>
        <TableUsers/>
    </div>
  );
}

export default withRouter(Users)
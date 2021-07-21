import React from 'react';
import {withRouter} from 'react-router-dom'
import TableSrs from './components/TableSrs'
import PageHeader from '../../components/PageHeader'
function Courses() {

  return (
    <div>
      <PageHeader title="Courses management"/>
      <TableSrs/>
    </div>
  );
}
export default withRouter(Courses)
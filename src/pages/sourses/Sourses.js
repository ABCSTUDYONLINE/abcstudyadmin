import React from 'react';
import {withRouter} from 'react-router-dom'
import TableSrs from './components/TableSrs'
import PageHeader from '../../components/PageHeader'
function Sourses() {

  return (
    <div>
      <PageHeader title="Table Sourses"/>
      <TableSrs/>
    </div>
  );
}
export default withRouter(Sourses)
import React from 'react'
import { Grid, Cell } from 'react-blazecss'
import { Fields } from '../fields/Fields'

export const FormGrid = ({data, errors, columns, onChange}) => (
  <Grid style={{marginLeft: '-1em', marginRight: '-1em'}}>
    {columns.map((col, idx) => (
      <Cell key={idx} width={col.width} fixedWidth={col.fixedWidth}>
        <Fields fields={col.fields} data={data} errors={errors} horizontal={false} onChange={onChange} />
      </Cell>
    ))}
  </Grid>
)
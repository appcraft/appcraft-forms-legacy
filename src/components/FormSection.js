import React from 'react'
import { Card, CardContent, H2 } from 'react-blazecss'
import { Fields } from '../fields/Fields'

export const FormSection = ({title, data, errors, fields, onChange, horizontal=false}) => (
  <Card shadow="high" style={{overflowY: 'visible', background: 'white', padding: '1em'}}>
    <CardContent>
      <H2 size="medium" style={{paddingTop: 0, paddingBottom: 0}}>{title}</H2>
      <Fields fields={fields} 
              errors={errors}
              data={data} 
              horizontal={horizontal} onChange={onChange} />
    </CardContent>
  </Card>
)
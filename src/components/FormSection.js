import React from 'react'
import { Card, CardContent, H2 } from 'react-blazecss'
import { Fields } from '../fields/Fields'

export const FormSection = ({title, data, errors, fields, onChange}) => (
  <Card shadow="high">
    <CardContent>
      <H2 size="medium" style={{paddingTop: 0, paddingBottom: 0}}>{title}</H2>
      <Fields fields={fields} 
              errors={errors}
              data={data} 
              horizontal={false} onChange={onChange} />
    </CardContent>
  </Card>
)
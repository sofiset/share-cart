import * as React from 'react'

type Props = {
  value: string
}

export class Title extends React.Component<Props> {
  render() {
    const { value } = this.props

    return <div>{value}</div>
  }
}

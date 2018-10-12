import * as React from 'react'

import { Title } from '~/components'

type Props = {}

export class UserList extends React.Component<Props> {
  render() {
    return (
      <div>
        <Title value="User List" />
      </div>
    )
  }
}

import * as React from 'react'

import { UserList } from '~apps/webapp/views'

type Props = {}

export class Home extends React.Component<Props> {
  render() {
    return (
      <div>
        Home Route
        <UserList />
      </div>
    )
  }
}

import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Home } from './home'
import { About } from './about'

type Props = {}

export class Main extends React.Component<Props> {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    )
  }
}

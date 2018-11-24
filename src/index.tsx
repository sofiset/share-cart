import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import { Main } from "~components"

window.onload = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>,
    document.getElementById("root")
  )
}

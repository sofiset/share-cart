import * as React from "react"
import * as Peer from "peerjs"

type State = {
  peer: Peer
  my_id: string
  peer_id: string
  initialized: boolean
  files: Array<any>
  msg: string
  connected: boolean
  conn: Peer.DataConnection
}

const INITIAL_STATE = {
  peer: new Peer({}),
  my_id: "",
  peer_id: "",
  initialized: false,
  files: [],
  msg: "",
  connected: false,
  conn: null
}

class FileSharer extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  componentWillMount() {
    const { peer, conn } = this.state

    peer.on("open", id => {
      this.setState({
        my_id: id,
        initialized: true
      })
    })

    peer.on("connection", connection => {
      console.log("someone connected")
      this.setState(
        {
          conn: connection
        },
        () => {
          conn.on("open", () => {
            this.setState({
              connected: true
            })
          })

          conn.on("data", this.onReceiveData)
        }
      )
    })
  }

  onReceiveData(data) {
    this.setState(prevState => ({
      files: [...prevState.files, data]
    }))
  }

  renderNotConnected() {
    return (
      <div>
        <hr />
        <div>
          <input type="text" onChange={this.handlePeerIdChange} />
          <label>Peer ID</label>
        </div>
        <button onClick={this.connect}>Connect</button>
      </div>
    )
  }

  handlePeerIdChange = event => {
    this.setState({
      peer_id: event.target.value
    })
  }

  connect = () => {
    const { peer_id, peer } = this.state
    const connection = peer.connect(peer_id)

    this.setState(
      {
        conn: connection
      },
      () => {
        this.state.conn.on("open", () => {
          console.log("connection opened")
          this.setState({
            connected: true
          })
        })
        // this.state.conn.on('data', this.onReceiveData);
      }
    )
  }

  renderConnected() {
    return (
      <div>
        <label htmlFor="msg-to-send">YO</label>
        <input type="text" id="msg-to-send" />
        <button onClick={} />
      </div>
    )
  }

  render() {
    const { initialized, my_id, connected } = this.state

    return initialized ? (
      <div>
        <div>
          <span>Your PeerJS ID: </span>
          <strong>{my_id}</strong>
        </div>
        {connected ? this.renderConnected() : this.renderNotConnected()}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default FileSharer

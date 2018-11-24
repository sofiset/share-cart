import * as React from "react"
import Peer from "peerjs"

class FileSharer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peer: new Peer(),
      my_id: "",
      peer_id: "",
      initialized: false,
      files: [],
      msg: "hello",
      connected: false
    }
  }

  componentWillMount() {
    const { peer, conn } = this.state

    peer.on("open", id => {
      console.log("My peer ID is: " + id)
      this.setState({
        my_id: id,
        initialized: true
      })
    })

    peer.on("connection", connection => {
      console.log("someone connected")
      console.log(connection)

      this.setState(
        {
          conn: connection
        },
        () => {
          this.state.conn.on("open", () => {
            this.setState({
              connected: true
            })
          })

          this.state.conn.on("data", this.onReceiveData)
        }
      )
    })
  }

  onReceiveData(data) {
    let arr = this.state.files.push(data)
    this.setState({ files: arr })
  }

  renderNotConnected() {
    return (
      <div>
        <hr />
        <div>
          <input type="text" onChange={this.handleTextChange} />
          <label>Peer ID</label>
        </div>
        <button onClick={this.connect}>Connect</button>
      </div>
    )
  }

  handleTextChange = event => {
    this.setState({
      peer_id: event.target.value
    })
  }

  connect = () => {
    console.log("connect function")
    var peer_id = this.state.peer_id
    var connection = this.state.peer.connect(peer_id)

    console.log("connection", connection)

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
    var result

    if (this.state.initialized) {
      result = (
        <div>
          <div>
            <span>Your PeerJS ID: </span>
            <strong className="mui--divider-left">{this.state.my_id}</strong>
          </div>
          {this.state.connected
            ? this.renderConnected()
            : this.renderNotConnected()}
        </div>
      )
    } else {
      result = <div>Loading...</div>
    }

    return result
  }
}

export default FileSharer

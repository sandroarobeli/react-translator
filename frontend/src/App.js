import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textToTranslate: '',
      translated: '',
      modelId: ''
    }
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.translateIt = this.translateIt.bind(this)
  }
  
  handleChangeSelect (event) {
    this.setState(() => ({
      modelId: event.target.value
    }))
    console.log('modelId: ' + this.state.modelId)// test
  }

  handleChangeInput(event) {
    this.setState(() => ({
      textToTranslate: event.target.value
    }))
  }

  translateIt() {
    document.getElementById("waiting").hidden = false;
    axios.get('http://127.0.0.1:3333/translate?textToTranslate=' + this.state.textToTranslate + '&modelId=' + this.state.modelId) 
    .then(response => {
        document.getElementById("waiting").hidden = true;
        this.setState(() => ({
          translated: response.data
        }))
    })
    .catch(error => console.log('Error:\n' + error))



    
    console.log('modelId: ' + this.state.modelId)// test
  }

  render () {
    return (
      <div className='container'>
        <div className='card'>
          <div className='input-group input-group-lg'>
            <div className="input-group-prepend">
              <select value={this.state.modelId} onChange={this.handleChangeSelect} className="form-select input-group-text" required aria-label=".form-select-lg example">
                <option value='default'>Select language</option>
                <option value="en-de">German</option>
                <option value="en-it">Italian</option>
                <option value="en-es">Spanish</option>
                <option value="en-ja">Japanese</option>
                <option value="en-fr">French</option>
                <option value="en-ru">Russian</option>
                <option value="en-sv">Swedish</option>
                <option value="en-tr">Turkish</option>
                <option value="en-he">Hebrew</option>
                <option value="en-el">Greek</option>
              </select>
            </div>
            <input required value={this.state.textToTranslate} onChange={this.handleChangeInput} id="textToTranslate" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
          </div>
          <div>
            <button onClick={this.translateIt} type="button" className="btn btn-info btn-block active">Translate</button>
            <div className="spinner-border" role="status" hidden={true} id="waiting">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div className="alert alert-light" role="alert" id="translated">{this.state.translated}</div>
        </div>
      </div>
    )
  }
  
}

export default App;



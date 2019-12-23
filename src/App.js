import React, {Component} from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component'


class App extends Component {

  constructor() {
    super()
    this.state = {
      monsters: [],
      currentSort: 0,
      searchText: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => this.setState({monsters: [...json]}))
  }

  sortByName = () => {
    const sf = this.state.currentSort === 0 ? 1 : this.state.currentSort === 1 ? -1 : 0
    const workingCopy = [...this.state.monsters]
    // workingCopy.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
    if (sf === 0) {
      workingCopy.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
    } else {
      workingCopy.sort((a, b) => a.name > b.name ? 1 * sf : a.name < b.name ? -1 * sf : 0)
    }
    this.setState({monsters: workingCopy, currentSort: sf})
  }

  render() {
    const {monsters, searchText} = this.state
    const filteredMonsters = monsters.filter(m => m.name.toLowerCase().includes(searchText.toLowerCase()))
    return (
      <div className="App">
        <h1>Monster Book</h1>
        <p><button onClick={this.sortByName}>Sort by name</button></p>
        <p>
          <SearchBox 
            placeholder='Search Monsters'
            handleChange={event => this.setState({searchText: event.target.value})}
          />
        </p>
        <CardList monsters={filteredMonsters}/>        
      </div>
    );
  }
}

export default App;

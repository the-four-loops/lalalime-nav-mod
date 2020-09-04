import React from 'react';
import axios from 'axios';
import SearchResults from './SearchResults.jsx';

// const suggestions = [
//   "pants", "track pants", "ABC pants", "women's pants", "men's pants", "girls pants",
//   "shirts", "long sleeve shirts", "short sleeve shirts", "men's long sleeve shirts", "men's shirts", "women's shirts",
//   "yellow shorts", "yellow swimsuits", "yellow tank tops"
// ];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchClicked: false,
      results: [],
      suggestedOptions: []
    }
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickInside = this.handleClickInside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.suggestChange = this.suggestChange.bind(this);
    this.getAll = this.getAll.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ searchClicked: false }, () => this.setState({ query: '' }));
    }
  }

  handleClickInside() {
    this.setState({ searchClicked: true });
  }

  handleChange(e) {
    this.setState({ query: e.target.value }, () => {
      if (this.state.query.length >= 3) {
        this.getAll();
      }
    });
  }

  getAll() {
    let query = this.state.query;
    if (query.includes('leg')) query = 'leggings';
    axios
      .get(`/api/search/${query}`)
      .then((response) => {
        let portion = Math.floor(Math.random() * 5)
        let data = response.data;
        if (typeof data === 'string') data = JSON.parse(response.data);
        this.setState({
          results: data.slice(portion, portion + 4)
        }, () => 
        this.suggestChange())
      })
      .catch((err) => console.log(err))
  }

  suggestChange() {
    let suggestions = [];
    let queries = this.state.query.split(' ').filter(q => q !== "")
    let options = this.state.results;
    let example = options[0];
    if (!options.length || queries[0].includes('2') || queries[0].includes('3')) {
      this.setState({ suggestedOptions: [] })
    } else {
      if (queries.length === 1) {
        let query = queries.join('');
        if (example.gender.toLowerCase().includes(query.slice(0, -1))) {
          suggestions.push(example.gender.slice(0, -2))
          suggestions.push(`Outfits for ${example.gender.slice(0, -2)}`)
          suggestions.push(`View All Men's + Women's Accessories`)
          suggestions.push(`${example.gender} Sale`)
          if (example.gender.includes("Wom")) {
            suggestions.push(`${example.gender} Leggings`)
          } else {
            suggestions.push(`${example.gender} Loungewear`)
          }
          suggestions.push(`${example.gender} ${example.style}`)
        }
        if (example.color.toLowerCase().includes(query)) {
          suggestions.push(`${example.color} Sale`)
          suggestions.push(`${example.color} Loungewear`)
          options.forEach(option => {
            if (!suggestions.includes(`${option.color} ${option.style}`)) suggestions.push(`${option.color} ${option.style}`)
          })
        }
        if (`${example.name}s`.toLowerCase().includes(query) || query === 'joggers' || query === 'shorts') {
          if (query.includes('rac')) {
            let name = example.name.split(' ').filter(word => word.toLowerCase().includes(query))
            suggestions.push(`${name} Collection`)
          } else {
            suggestions.push(`${example.name.slice(0, -2)} Collection`)
          }
        }
        if (example.style.toLowerCase().includes(query)) {
          suggestions.push(`Mens ${example.style}`)
          suggestions.push(`Womens ${example.style}`)
        }
      } else if (queries.length === 2){
        if (example.gender.toLowerCase().includes(queries[1].slice(0, -1)) || example.color.toLowerCase().includes(queries[1])) {
          [queries[0], queries[1]] = [queries[1], queries[0]];
        }
        if (example.gender.toLowerCase().includes(queries[0].slice(0, -1))) {
          if (example.color.toLowerCase().includes(queries[1]) || queries[1].includes('2') || queries[1].includes('3')) {
            suggestions.push('')
          }
          if (example.style.toLowerCase().includes(queries[1]) || queries[1] === 'joggers' || queries[1] === 'shorts' || queries[1].includes('t')) {
            options.forEach(opt => {
              let name = opt.name.split(' ').filter(word => !word.includes('2') && !word.includes('3')).join(' ')
              if (!suggestions.includes(`${example.gender} ${name}`)) {
                suggestions.push(`${example.gender} ${name}`)
              }
            })
          }
          if (`${example.name}s`.toLowerCase().includes(queries[1]) || queries[1] === 'joggers' || queries[1] === 'shorts') {
            if (queries[1].includes('ra')) {
              let name = example.name.split(' ').filter(word => word.toLowerCase().includes(queries[1]) && !word.includes('2') && !word.includes('3'))
              suggestions.push(`${example.gender} ${name} Collection`)
            } else {
              let name = example.name.split(' ').filter(word => !word.includes('2') && !word.includes('3')).join(' ')
              suggestions.push(`${example.gender} ${name} Collection`)
            }
          }
        }
        if (example.color.toLowerCase().includes(queries[0])) {
          options.forEach(option => {
            if (!suggestions.includes(`${option.color} ${option.style}`)) suggestions.push(`${option.color} ${option.style}`)
          })
        }
      }
      this.setState({
        suggestedOptions: suggestions
      }, () => console.log(suggestions))
    }
  }

  render() {
    return (
      <span className="search-container" >
        <span>
          <form >
            <div className="search-wrapper">
              <input tabIndex="1" value={this.state.query} ref={this.setWrapperRef} onChange={this.handleChange} onClick={this.handleClickInside} type="text" placeholder="Search" className="search-bar" ></input>
              <img className="mag" src="./images/mag.png"></img>
            </div>
          </form>
          {this.state.query.length > 2 ? <SearchResults searchClicked={this.state.searchClicked} query={this.state.query} results={this.state.results} suggestedOptions={this.state.suggestedOptions} /> : null}
        </span>
      </span>
    )
  }
}

export default Search;
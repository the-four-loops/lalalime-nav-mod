import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: false,
      suggestions: []
    }
  }

  render() {
    let { results, query, suggestedOptions, searchClicked } = this.props
    if (!searchClicked) {
      return null;
    }

    if (searchClicked && query.length >= 3) {
      return (
        <div className="fullscreen">
          <div className="search-box">
            <div className="suggested">
              <div className="suggest-header">
                <h3 className="suggest-title">TOP SUGGESTIONS</h3>
                <div className="line"></div></div>
              <div className="sugg">
                {results.map((result, index) => (
                  <img className="sugg-img" name="popular1" key={index} src='./images/pan1.png' onMouseOut={this.mouseOutImage} onMouseOver={this.mouseOverImage}></img>
                ))}
                <div className="title-name">
                  {results.map((result, index) => (
                    <div className="sugg-title" key={index}>{result.name}</div>
                  ))}</div></div>
            </div>
            <div className="word-suggest">
              <div className="word">
                {suggestedOptions.map((suggest, index) => (
                <p className="word" key={index}>{suggest}</p>
              ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (query.length > 0 && results.length > 0) {
      return (
        <div className="suggestions-box-searched">
          <div className="suggested">
            <div className="suggest-header">
              <h3 className="suggest-title">TOP SUGGESTIONS </h3>
              <div className="line"></div></div>
            <div className="sugg">
              <img className="sugg-img" name="popular1" src={results[0].images} onMouseOut={this.mouseOutImage} onMouseOver={this.mouseOverImage}></img>
              <div className="sugg-title"> {results[0].name}</div></div>
            <div className="sugg">
              <img className="sugg-img" name="popular2" src={results[1].images} onMouseOut={this.mouseOutImage} onMouseOver={this.mouseOverImage}></img>
              <div className="sugg-title"> {results[1].name}</div></div>
            <div className="sugg">
              <img className="sugg-img" name="popular3" src={results[2].images} onMouseOut={this.mouseOutImage} onMouseOver={this.mouseOverImage}></img>
              <div className="sugg-title"> {results[2].name}</div></div>
            <div className="sugg">
              <img className="sugg-img" name="popular4" src={results[2].images} onMouseOut={this.mouseOutImage} onMouseOver={this.mouseOverImage}></img>
              <div className="sugg-title"> {results[3].name}</div></div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default SearchResults;
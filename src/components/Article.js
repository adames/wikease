import React, { Component } from 'react';
import Carousel from './Carousel'

class Article extends Component {

  state = {
    title: "Albert_Einstein",
    article: {Overview: {Synopsis: [
      {text: "Einstein was real smart.", links: ["E=MC2", "Genius"]},
      {text: "Super smart.", links: ["Brownian Stuff", "Black Holes"]},
    ]}},
    section: {Synopsis: [
      {text: "Einstein was real smart.", links: ["E=MC2", "Genius"]},
      {text: "Super smart.", links: ["Brownian Stuff", "Black Holes"]},
    ]},
    paragraph: 0
  }

  wikipedia = () => {
    return fetch(`http://localhost:8080/articles?title=${this.state.title}`)
      .then(res => res.json())
      .then(results =>
        this.setState({
          title: results["title"],
          article: results["article"],
          section: Object.values(results["article"])[0],
        })
      )
  }

  onChange = (event) => {
    console.log(event)
    if (event === 0 && this.state.paragraph === Object.values(a)[0].length){
      console.log(this.state.section)
    }
    else {
      setState({
        paragraph: event
      })
    }
  }

  render() {
    return (
      <div className="Article">
        <Carousel section={this.state.section} onChange={this.onChange} />
      </div>
    );
  }
}

export default Article;

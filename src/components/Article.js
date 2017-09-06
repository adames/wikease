import React, { Component } from 'react';
import Carousel from './Carousel'

class Article extends Component {
  state = {
    title: "Albert_Einstein",
    article: {Overview: {Synopsis: [
      {text: "Einstein was real smart.", links: ["E=MC2", "Genius"]},
      {text: "Super smart.", links: ["Brownian Stuff", "Black Holes"]},
      {text: "Did I say smart?", links: ["Brownian Stuff", "Black Holes"]},
    ]}},
    h2s: ['Overview'],
    currentH2: 0,
    h3s: ['Synopsis'],
    currentH3: 0,
    ps: [
      {text: "Einstein was real smart.", links: ["E=MC2", "Genius"]},
      {text: "Super smart.", links: ["Brownian Stuff", "Black Holes"]},
      {text: "Did I say smart?", links: ["Brownian Stuff", "Black Holes"]},
    ],
    currentP: 0,
  }

  updateArticleState(){
    let article = this.state.article
    let h2s = Object.keys(article)
    let h3s = Object.keys(article[h2s[this.state.currentH2]])
    let ps = article[h2s[this.state.currentH2]][h3s[this.state.currentH3]]
    debugger
    // My updateArticleState is causing issues with switching
    this.setState({
      h2s: h2s,
      h3s: h3s,
      ps: ps,
    })
  }

  changeSection = (action) => {
    switch (action) {
      case 'next':
        if (this.state.currentH3 === this.state.h3s.length - 1){
          this.setState({
            currentH2: this.state.h2s[this.state.currentH2 + 1],
            currentH3: 0,
            currentP: 0,
          }, () => this.updateArticleState())
        } else {
          this.setState({
            currentH3: this.state.currentH3 + 1,
            currentP: 0,
          }, () => this.updateArticleState())
        }
        break;

      case 'previous':
        if (this.state.currentH3 === 0){
          this.setState({
            currentH2: this.state.currentH2 - 1,
            currentH3: 0,
            currentP: 0,
          }, () => this.updateArticleState())
        } else {
          this.setState({
            currentH3: this.state.currentH3 - 1,
            currentP: 0,
          }, () => this.updateArticleState())
        }
        break;
        default:
          console.warn(action, 'is invalid action')
    }
  }

  wikipedia = () => {
    return fetch(`http://localhost:8080/articles?title=${this.state.title}`)
      .then(res => res.json())
      .then(results =>
        this.setState({
          title: results["title"],
          article: results["article"],
          currentH2: 0,
          currentH3: 0,
          currentP: 0,
        }, () => this.updateArticleState())
      )
  }

  onChange = (event) => {
    console.log('slide', event)
    if (event === 0 && this.state.currentP === this.state.ps.length){
      this.changeSection('next')
    } else if (event === (this.state.ps.length - 1) && this.state.currentP === 0){
      this.changeSection('previous')
    } else {
      this.setState({
        currentP: event
      })
    }
  }

  render() {
    return (
      <div className="Article">
        <Carousel
          ps={this.state.ps}
          currentH3={this.state.h3s[this.state.currentH3]}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Article;

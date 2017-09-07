import React, { Component } from 'react';
import Carousel from './Carousel'

class Article extends Component {
  state = {
    title: this.props.title,
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

  componentWillReceiveProps(nextProps){
    if (nextProps.title !== this.props.title) {
      fetch(`http://localhost:8080/articles?title=${nextProps.title}`)
      .then(res => res.json())
      .then(results =>
        this.setState({
          article: results["article"],
          currentH2: 0,
          currentH3: 0,
          currentP: 0,
        }, () => this.updateArticleState())
      )
    }
  }

  updateArticleState(){
    let article = this.state.article
    let h2s = Object.keys(article)
    let h3s = Object.keys(article[h2s[this.state.currentH2]])
    let ps = article[h2s[this.state.currentH2]][h3s[this.state.currentH3]]
    debugger
    this.setState({
      h2s: h2s,
      h3s: h3s,
      ps: ps,
    })
  }

  changeSection = (action) => {
    //check if we're on the last p. if not, just change that
    // check if we're also on the last h3. if not, change that and the previous
    //finally, check if we're on the last h2. if not, change that and the previous
    console.log('hit changesection')
    switch (action) {
      case 'next':
        if (this.state.currentP < this.state.ps.length){
          this.setState({
            currentP: this.state.currentP + 1,
          }, () => this.updateArticleState())
        } else if (this.state.currentH3 < this.state.h3s.length){
          this.setState({
            currentH3: this.state.currentH3 + 1,
            currentP: 0,
          }, () => this.updateArticleState())
        } else if (this.state.currentH2 < this.state.h2s.length){
          this.setState({
            currentH2: this.state.currentH2 + 1,
            currentH3: 0,
            currentP: 0,
          }, () => this.updateArticleState())
        } else {
          console.log("could not execute next")
        }
        break;
      case 'previous':
        if (this.state.currentP > 0){
          this.setState({
            currentP: this.state.currentP - 1,
          }, () => this.updateArticleState())
        } else if (this.state.currentH3 > 0){
          this.setState({
            currentH3: this.state.currentH3 - 1,
            currentP: 0,
          }, () => this.updateArticleState())
        } else if (this.state.currentH2 > 0){
          this.setState({
            currentH2: this.state.currentH2 - 1,
            currentH3: 0,
            currentP: 0,
          }, () => this.updateArticleState())
        } else {
          console.log("could not execute previous")
        }
        break;
      default:
        console.warn(action, "invalid command")
    }
  }

  onChange = (index) => {
    // let paragraph = element.props.children.props.children[2]
    if (index > this.state.currentP || (index === 0 && this.state.currentP === this.state.ps.length)){
      this.changeSection('next')
    } else if (index < this.state.currentP || (index === this.state.ps.length && this.state.currentP === 0)) {
      this.changeSection('previous')
    }
  }

  render() {
    return (
      <div className="Article">
        <Carousel
          ps={this.state.ps}
          currentH3={this.state.h3s[this.state.currentH3]}
          currentH2={this.state.h2s[this.state.currentH2]}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Article;

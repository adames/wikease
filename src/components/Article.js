import React, { Component } from 'react';
import { Header, Segment, Button } from 'semantic-ui-react'
import Carousel from './Carousel'
import Related from './Related'
import MenuItems from './MenuItems'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      article: {},
      h2s: [],
      currentH2: 0,
      h3s: [],
      currentH3: 0,
      ps: [],
      currentP: 0,
      images: [],
      currentImage: 0,
    }
  }

  componentDidMount() {
   this.wikipedia('Albert Einstein')
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.title !== this.props.title) {
      this.wikipedia(nextProps.title)
      this.bing(nextProps.title)
    }
  }

  wikipedia(title) {
    fetch(`https://wikeasebackend.herokuapp.com/articles?title=${title}`)
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

  bing(title) {
    fetch(`https://wikeasebackend.herokuapp.com/images?title=${title}`)
    .then(res => res.json())
    .then(images =>
      this.setState({
        images,
        currentImage: 0
      })
    )
  }

  next = () => {
    this.changeSection('next')
  }

  prev = () => {
    this.changeSection('previous')
  }

  updateArticleState(){
    let article = this.state.article
    let h2s = Object.keys(article)
    let h3s = Object.keys(article[h2s[this.state.currentH2]])
    let ps = article[h2s[this.state.currentH2]][h3s[this.state.currentH3]]
    let images = ['http://homepages.neiu.edu/~whuang2/cs300/images/white.png']
    let currentImage = 0

    if (this.state.images.length > 0) {
      images = this.state.images
      currentImage = (this.state.currentImage + 1) % this.state.images.length
    }

    let prevState = JSON.stringify([this.state.h2s, this.state.h3s, this.state.ps])
    let nextState = JSON.stringify([h2s, h3s, ps])
    if (prevState !== nextState) {
      this.setState({
        h2s: h2s,
        h3s: h3s,
        ps: ps,
        images: images,
        currentImage: currentImage,
      })
    }
  }

  changeSection = (action) => {
    //check if we're on the last p. if not, just change that
    // check if we're also on the last h3. if not, change that and the previous
    //finally, check if we're on the last h2. if not, change that and the previous
    switch (action) {
      case 'next':
        if (this.state.currentP < this.state.ps.length - 1){
          this.setState({
            currentP: this.state.currentP + 1,
          }, () => this.updateArticleState())
        } else if (this.state.currentH3 < this.state.h3s.length - 1){
          this.setState({
            currentH3: this.state.currentH3 + 1,
            currentP: 0,
          }, () => this.updateArticleState())
        } else if (this.state.currentH2 < this.state.h2s.length - 1){
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
        this.setState({
          currentH2: this.state.h2s.findIndex(h2 => h2 === action),
          currentH3: 0,
          currentP: 0,
        }, () => this.updateArticleState())
    }
  }

  render() {
    return (
      <Segment basic className="Article">
        <Header as='h1' textAlign='center' attached='top' id="Article">
          {this.props.title}
        </Header>
        <MenuItems
          h2s={this.state.h2s}
          changeSection={this.changeSection}
          currentH2Name={this.state.h2s[this.state.currentH2]}
        />
        <Carousel
          ps={this.state.ps}
          currentP={this.state.currentP}
          currentH3Name={this.state.h3s[this.state.currentH3]}
          currentImageName={this.state.images[this.state.currentImage]}
        />
        <Button.Group attached='bottom'>
          <Button onClick={this.prev}>Previous Paragraph</Button>
          <Button onClick={this.next}>Next Paragraph</Button>
        </Button.Group>
        <Related
          ps={this.state.ps[this.state.currentP]}
          changeTitle={this.props.changeTitle}
        />
      </Segment>
    )
  }
}

export default Article;

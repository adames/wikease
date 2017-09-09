import React, { Component } from 'react';
import { Header, Container, Sidebar, Menu, Segment, Button } from 'semantic-ui-react'
import Carousel from './Carousel'
import Related from './Related'
import ArticleMenu from './ArticleMenu'

class Article extends Component {
  state = {
    title: this.props.title,
    article: {},
    h2s: [],
    currentH2: 0,
    h3s: [],
    currentH3: 0,
    ps: [],
    currentP: 0,
    visible: true,
  }

  componentDidMount() {
   this.wikipedia('Albert Einstein')
  }

  wikipedia(title) {
    fetch(`http://localhost:8080/articles?title=${title}`)
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

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  componentWillReceiveProps(nextProps){
    if (nextProps.title !== this.props.title) {
      this.wikipedia(nextProps.title)
    }
  }
  updateArticleState(){
    let article = this.state.article
    let h2s = Object.keys(article)
    let h3s = Object.keys(article[h2s[this.state.currentH2]])
    let ps = article[h2s[this.state.currentH2]][h3s[this.state.currentH3]]

    let prevState = JSON.stringify([this.state.h2s, this.state.h3s, this.state.ps])
    let nextState = JSON.stringify([h2s, h3s, ps])
    if (prevState !== nextState) {
      this.setState({
        h2s: h2s,
        h3s: h3s,
        ps: ps,
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
    }
  }
  next = () => {
    this.changeSection('next')
  }

  prev = () => {
    this.changeSection('previous')
  }

  render() {
    const { visible } = this.state
    return (
      <Container>
        <Header as='h1' attached='top'>
          {this.props.title}
        </Header>
        <Sidebar.Pushable as={Segment} attached>
          <Sidebar as={Menu} animation='slide along' width='thin' visible={visible} vertical>
            <ArticleMenu h2s={this.state.h2s}/>
          </Sidebar>
          <Sidebar.Pusher>
            <Carousel
              ps={this.state.ps}
              currentP={this.state.currentP}
              currentH3Name={this.state.h3s[this.state.currentH3]}
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Button.Group attached='bottom'>
        <Button onClick={this.prev} >Previous Paragraph</Button>
        <Button onClick={this.next} >Next Paragraph</Button>
        </Button.Group>
        <Related ps={this.state.ps[this.state.currentP]}/>
      </Container>
    )
  }
}

export default Article;
// Removed for simplicity.
//<Button onClick={this.toggleVisibility}>Navigate {this.state.title}</Button>

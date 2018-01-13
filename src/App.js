import React, { Component } from 'react'

import { Menu, Segment } from 'semantic-ui-react'
import { Form, Message, Button, Comment, TextArea } from 'semantic-ui-react'
import { Header, Image, Modal, Icon, form, Dropdown, Divider } from 'semantic-ui-react'

export default class App extends Component {



  state = {
    activeItem: 'udacity',
    categories: undefined,
    postOfSpecificCategory: undefined,
    titleToPost: '',
    authorToPost: '',
    contentToPost: '',
    categoryToPost: '',
    commentToPost:'',
    totalPosts: undefined,
    reactPost: undefined,
    reduxPost: undefined,
    udacityPost: undefined,
    voteCount:0,
    openCommentModal:'false',
    commentToPost:'',
    openviewCommentModal:'false',
    commentToShow:[]
  }



  handleClose = () => this.setState({ activeItem: '' })
  handleCommentClose=()=>this.setState({openCommentModal:'false',openviewCommentModal:'false'})
  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, this.fetchSpecificCategory)

  fetchSpecificCategory() {
    /* fetch API request to get all the post displayed of a particular category */

    fetch(
      `http://localhost:3001/${this.state.activeItem}/posts`,
      {
        method: 'GET',
        headers: { 'Authorization': 'whatever-you-want' },
        'Content-Type': 'application/json'
      }

    ).then(function (response) { return response.json() })
      .then(data => { this.setState({ postOfSpecificCategory: data }); console.log(data); });
  }



handleChange = (e, { name, value }) => this.setState({ [name]: value })
handlevote = (data, votestatus, voteScore) => {
  
  var tosend = { "option": votestatus }
  console.log(data);
  console.log(votestatus);
  fetch(
    `http://localhost:3001/posts/${data}`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tosend),
    }).then(function (response) { return response.json() })
    .then(data => { console.log(data); });
}

handleViewComment=(data)=>{
  this.setState({openviewCommentModal:'true'})
  console.log(data);
    fetch(
    `http://localhost:3001/posts/${data}/comments`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      }
    }).then(function (response) { return response.json() })
    .then(data => {
      console.log(data);
      this.setState({commentToShow:data})})
        
}


/* Method to handle the submit of Add Post form */
handleSubmit = () => {
  this.setState({openCommentModal:'false'});
  // console.log("on click of submit");
  /* function to generate unique id for the user  */
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



  const { contentToPost, categoryToPost, titleToPost, authorToPost } = this.state
  var uuid = guid();
  this.setState({ contentToPost, categoryToPost, titleToPost, authorToPost })

  var data =
    {
      "id": uuid,
      "timestramp": Date.now(),
      "title": this.state.titleToPost,
      "author": this.state.authorToPost,
      "category": this.state.categoryToPost,
      "body": this.state.contentToPost,

    }
  /* fetch API call to add a post on server */

  fetch(
    "http://localhost:3001/posts",
    {
      method: 'POST',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),


    },
  ).then(function (response) {
    //console.log(response.status);

    return response.json();
  })
    .then(function (data) {
      // this.setState({})
      console.log(data);
    });
  this.handleClose();

}


/*to add a comment for a post */
handleComment = (post) => {
  this.setState({openCommentModal:'true'});
  // console.log("on click of submit");
  /* function to generate unique id for the user  */
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  const { commentToPost } = this.state
  var uuid = guid();
  this.setState({ commentToPost })

  var data =
    {
      "id": uuid,
      "timestramp": Date.now(),
      "author": post.author,
      "parentId":post.id,
      "body": this.state.commentToPost,

    }
    console.log(data+"Data for posting cooments");
  /* fetch API call to add a post on server */

  fetch(
    "http://localhost:3001/comments",
    {
      method: 'POST',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),


    },
  ).then(function (response) {
    //console.log(response.status);

    return response.json();
  })
    .then(function (data) {
      // this.setState({})
      console.log(data);
    });
  this.handleClose();

}



constructor(props) {
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount() {

  /* fetch API request to get all the categories present on server */
  fetch(
    "http://localhost:3001/categories",
    {
      method: 'GET',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
    }

  ).then(function (response) { return response.json() })
    .then(data => { this.setState(data) });


}

  render() {
    console.log(this.state.commentToShow)
    this.state.reactPost = this.state.postOfSpecificCategory && this.state.postOfSpecificCategory.filter((data) => data.category === 'react');
    this.state.reduxPost = this.state.postOfSpecificCategory && this.state.postOfSpecificCategory.filter((data) => data.category === 'redux');
    this.state.udacityPost = this.state.postOfSpecificCategory && this.state.postOfSpecificCategory.filter((data) => data.category === 'udacity');

    //console.log(this.state.postOfSpecificCategory);
    //console.log(this.state.reactPost);
    //console.log(this.state.reduxPost);
    //console.log(this.state.udacityPost);

    const options = [
      { key: 'm', text: 'react', value: 'react' },
      { key: 'f', text: 'redux', value: 'redux' },
      { key: 'U', text: 'udacity', value: 'udacity' }
    ]
    var friendOptions = [{ text: 'react' }, { text: 'redux' }, { text: 'udacity' }]
    const { categoryToPost, contentToPost, titleToPost, authorToPost } = this.state
    const { activeItem } = this.state
    //console.log(this.state.categories)
    // console.log(this.state.activeItem)
    // console.log(this.state.contentToPost)
    //console.log(this.state.categoryToPost)
    // console.log(this.state.authorToPost)
    //  console.log(this.state.titleToPost)
    return (
      <div >
       <Menu pointing secondary>
          {
            this.state.categories && this.state.categories.map((data) => {
              return (
               
                <Menu.Item name={data.name} id={data.name} 
                active={activeItem === data.name} onClick={this.handleItemClick} />
                )
            })}
          <Menu.Menu position='right'>
            <Menu.Item name='Post Content' active={activeItem === 'Post Content'} onClick={this.handleItemClick} />
          </Menu.Menu>
         </Menu>


        {
          this.state.reduxPost && this.state.reduxPost.map((data) => {
         // console.log(data);
          return ( <Segment padded='very'><Message.Content>
            {data.body} <Divider /></Message.Content> <Button onClick={(event)=>this.handlevote(data.id, 'upVote', data.voteScore)}
              content='Like'
              icon='heart'
              style={{height:35}}
              label={{ as: 'a', basic: true, content: data.voteScore }}
              labelPosition='right'
            />  <Button onClick={(event)=>this.handlevote(data.id, 'downVote', data.voteScore)}
              color='red'
              content=''
              icon='heart'
              style={{height:35}}
              label={{ basic: true, color: 'red', pointing: 'left', content: data.voteScore }}
            />
            <Button onClick={(event)=>this.handleComment(data)}
              color='red'
              content='postComment'
              style={{height:35}}
              label={{ basic: true, color: 'red', pointing: 'left', content:'' }}
            />
            <Button onClick={(event)=>this.handleViewComment(data.id)}
              color='red'
              content='viewComment'
              style={{height:35}}
              label={{ basic: true, color: 'red', pointing: 'left', content:'' }}
            />
            <Divider /> </Segment>
            
            )
        })
        }



        {this.state.udacityPost && this.state.udacityPost.map((data) => {
          return (
        
            
           <section><Message.Content>
            <Divider /></Message.Content> <Button onClick={(event)=>this.handlevote(data.id, 'upVote', data.voteScore)}
              content='Like'
              icon='heart'

              label={{ as: 'a', basic: true, content: data.voteScore }}
              labelPosition='right'
            />  <Button onClick={(event)=>this.handlevote(data.id, 'downVote', data.voteScore)}
              color='red'
              content='Dislike'
              icon='heart'
              label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
            /><Divider /></section> )
        })}




        {this.state.reactPost && this.state.reactPost.map((data) => {
          return (<section><Message.Content>
            {data.body} <Divider />{data.voteScore}</Message.Content> <Button onClick={(event)=>this.handlevote(data.id, 'upVote', data.voteScore)}
              content='Like'
              icon='heart'

              label={{ as: 'a', basic: true, content: data.voteScore }}
              labelPosition='right'
            />  <Button onClick={(event)=>this.handlevote(data.id, 'downVote', data.voteScore)}
              color='red'
              content='Dislike'
              icon='heart'
              label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
            /><Divider /></section>)
        })}

        <Modal style={{width:600}}
        open={this.state.activeItem === 'Post Content'}
          onClose={this.handleClose}>
          <Modal.Header>Add the Post </Modal.Header>
          <Modal.Content>
            <div>
              <Form onSubmit={this.handleSubmit} >

                <Form.Field>
                  <Form.Input placeholder='Enter Comment' name='contentToPost' value={contentToPost} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>

                  <Form.Select placeholder='Enter category' name='categoryToPost' options={options} value={categoryToPost} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <Form.Input placeholder='Enter Author' name='authorToPost' value={authorToPost} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                  <Form.Input placeholder='Enter Title' name='titleToPost' value={titleToPost} onChange={this.handleChange} />
                </Form.Field>
                <Form.Button type="button" color='green' content='Submit' onClick={this.handleSubmit} inverted>
                  <Icon name='checkmark' />Add Post
           </Form.Button>
              </Form>

            </div>


          </Modal.Content>

        </Modal>


              {/*Modal to open for the comment section*/}
       <Modal style={{width:400}}
       
        open={this.state.openCommentModal === 'true'}
        
          onClose={this.handleCommentClose}>
          <Modal.Header>Comment Section </Modal.Header>
         
         
         
         
          <Modal.Content>
    
            <div>
              <Form onSubmit={this.handleCommentSubmit} >

                <Form.Field >
                  <Form.Input style={{height:80}} placeholder='Enter Content' name='commentToPost' value={this.state.commentToPost} onChange={this.handleChange} />
                </Form.Field>
               
                <Form.Button type="button" color='green' content='Submit' onClick={this.handleSubmit} inverted>
                  <Icon name='checkmark' />Comment
           </Form.Button>
              </Form>

            </div>


          </Modal.Content>

        </Modal>
    
       {/*Modal to open all the comments*/}


       <Modal style={{width:400}}
       
        open={this.state.openviewCommentModal === 'true'}
        
          onClose={this.handleCommentClose}>
          <Modal.Header>Comments Here</Modal.Header>
         <Modal.Content>
    
            <div>
            {
              this.state.commentToShow && this.state.commentToShow.map((data)=><div>{data.body}</div>)
           
              }
            </div>


          </Modal.Content>

        </Modal>

      </div>
         
    )
  }
}
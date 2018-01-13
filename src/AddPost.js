import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class AddPost extends Component {
 
     state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
      open={this.props.modalOpen}
        onClose={this.handleClose}>
    <Modal.Header>Add the Post </Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
      
    </Modal.Content>
<Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' />Add Post
          </Button>
        </Modal.Actions>
  </Modal>
    )
  }
}

export default AddPost

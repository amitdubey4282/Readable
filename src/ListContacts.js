import React, { Component } from 'react';

import PropTypes from 'prop-types'

function ListContacts (props) {
    return (

      <ol className='contacts-list'>
        {props.contacts.map((contacts) =>
          (
            <li key={contacts.name} className='contact-list-item'>
             
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contacts.avatarURL})`

              }}>
              </div>
              <div className='contact-details'>
                <p>{contacts.name}</p>
                <p>{contacts.email} </p>
                </div>
              <button onClick={() =>props.onDeleteContact(contacts)} className='contact-remove'>
                Remove
                </button>
            </li>
          ))}
      </ol>

    )


  
}

export default ListContacts

import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function Email({email, toggleRead, toggleStarred}){
  return(
    <li className={`email ${email.read ? "read":"unread"} ${email.starred ? "starred":"unstarred"}`}>
      <input
        className="select-checkbox"
        type="checkbox"
        checked={email.read}
        onChange={() => toggleRead(email)}
      />
      <input
        className="star-checkbox"
        type="checkbox"
        checked={email.starred}
        onChange={() => toggleStarred(email)}
      />
      <div className="sender">{email.sender}</div>
      <div className="title">{email.title}</div>
    </li>
  )
}

function EmailList({emails, toggleRead, toggleStarred}){
  return(
    <ul className="email-list">
      {emails.map((email, index) => (
        <Email 
          key={index}
          email={email}
          toggleRead={toggleRead}
          toggleStarred={toggleStarred}
        />
      ))}
    </ul>
  )
}

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [hideReadEmails, setHideReadEmails] = useState(false)

  function toggleRead(target){
    setEmails( emails.map(email =>
      email === target ? {...email, read: !email.read} : email
    ))
  }
  
  function toggleStarred(target){
    setEmails( emails.map(email =>
      email === target ? {...email, starred: !email.starred} : email
    ))
  }

  const filterEmails = hideReadEmails ? emails.filter(email => !email.read) : emails

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadEmails}
              onChange={e => setHideReadEmails(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{/* Render a list of emails here */}
        <EmailList 
          emails={filterEmails}
          toggleRead={toggleRead}
          toggleStarred={toggleStarred}
        />
      </main>
    </div>
  )
}

export default App

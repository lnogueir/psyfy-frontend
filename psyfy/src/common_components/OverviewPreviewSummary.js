import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function OverviewPreviewSummary(props){
  return(
    <Card style={{width:'51em'}}>
      <Card.Header as="h5">Summary</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p className="scrollbox">
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.{' '}
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">Dr. Lucas Nogueira</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  )
}

export default OverviewPreviewSummary;

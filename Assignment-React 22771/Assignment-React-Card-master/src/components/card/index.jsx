import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Trial() {
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ffree-background&psig=AOvVaw3G9xYMirDmRrxaBo8aUwlu&ust=1679595212235000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPidl-GR8P0CFQAAAAAdAAAAABAE" />
      <Card.Body>
        <Card.Title>Card Assignment</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
}

export default Trial;
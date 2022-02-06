import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function Items({ data }) {
  console.log(data)
  return (<Container id="items">
    { data.items.map( (row, index) => {
      return (
        <Link href={`/items/${row.id}`} key={ row.id }>
          <Card>
            <Card.Body>
              <Container fluid>
                <Row>
                  <Col xs="auto">
                    <Image className="item-image" src={row.picture}></Image>
                  </Col>
                  <Col xs="7">
                    <Card.Title> { row.price.currency } { row.price.amount }.{ row.price.decimals } { row.free_shipping ? <Image className="shipping_image" src="/ic_shipping.png"></Image> : null }</Card.Title>
                    <p> { row.title }</p>
                    <p> { row.condition === 'new' ? 'Nuevo' : 'Usado' }</p>
                  </Col>
                  <Col>
                  <p className="location"> { row.location }</p>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            { index != (data.items.length - 1) ? <hr></hr> : null}
          </Card>
        </Link>
      )
    }) }
  </Container>)
}

Items.getInitialProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/items?q=${context.query.search}`)
  const data = await res.json()
  return { data }
}

export default Items

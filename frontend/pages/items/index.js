import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function Items({ data }) {
  return (<Container id="items">
    <Row id="breadcrumb">
      { data.categories.map( (category, index) => { return (
        <Col xs="auto" key={index}>
          { category } { index != (data.categories.length - 1) ? <span className="separator"> &gt; </span>  : null}
        </Col>
      )})}
    </Row>
    { data.items.map( (row, index) => {
      return (
        <Link href={`/items/${row.id}`} key={ row.id }>
          <Card>
            <Card.Body>
              <Container fluid>
                <Row>
                  <Col xs="auto">
                    <Image className="item-image" src={row.picture} alt={row.title}></Image>
                  </Col>
                  <Col xs="7">
                    <Card.Title> { row.price.currency } { row.price.amount }.{ row.price.decimals } { row.free_shipping ? <Image className="shipping_image" src="/ic_shipping.png"></Image> : null }</Card.Title>
                    <p className="name"> { row.title }</p>
                    <p className="name"> { row.condition === 'new' ? 'Nuevo' : 'Usado' }</p>
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
  try {
    const res = await fetch(`http://localhost:3000/api/items?q=${context.query.search}`)
    const data = await res.json()
    return { data }
  } catch (error) {
    console.log(error)
  }
}

export default Items

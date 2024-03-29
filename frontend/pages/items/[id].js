import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Head from 'next/head'


function Item({ data }) {
  return (<Container id="item">
    <Head>
      <title>Detalle - {data.item.title}</title>
      <meta name="description" content="Detalle del producto" />
      <link rel="icon" href="/Logo_ML.png" />
    </Head>
    <Row>
        <Col xs="12" sm="9" className="d-flex justify-content-center">
            <Image src= {data.item.picture} alt={data.item.title}></Image>
        </Col>
        <Col className="right" xs="12" sm="3">
            <p> { data.item.condition === 'new' ? 'Nuevo' : 'Usado' } - { data.item.sold_quantity } vendidos </p> 
            <h2> { data.item.title } </h2>
            <h1> { data.item.price.currency } { data.item.price.amount }.{ data.item.price.decimals }</h1>
            <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                    Comprar
                </Button>
            </div>
        </Col>
    </Row>

    <Row>
        <h1 className="description-title"> Descripción del producto</h1>
    </Row>
    <Row >
        <Col xs="12" md="8">
            <p className="description-text"> {data.item.description}</p>
        </Col>
    </Row>
  </Container>)
}

Item.getInitialProps = async (context) => {
	try {
		const res = await fetch(`http://localhost:3000/api/items/${context.query.id}`)
		const data = await res.json()
		return { data }
	} catch (error) {
		console.log(error)
	}
}

export default Item

import { useState } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function Layout({ children }) {

	const [search, setSearch] = useState('')
	const router = useRouter()

	const doSearch = () => {
		router.push({
			pathname: '/items',
			query: { search },
		})
	}

	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			router.push({
				pathname: '/items',
				query: { search },
			})
		}
	}

	return (
		<>
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="/">
						<Image src="/Logo_ML.png"></Image>
					</Navbar.Brand>
					<InputGroup>
						<FormControl placeholder="Nunca dejes de buscar" aria-label="Nunca dejes de buscar" aria-describedby="search" onChange={event => setSearch(event.target.value)} onKeyPress={ event => handleKeyPress(event)} />
						<Button id="search-button" onClick={doSearch}>
							<Image src="/ic_Search.png"></Image>
						</Button>
					</InputGroup>
				</Container>
			</Navbar>
			<main>
				{children}
			</main>
		</>
	)
}
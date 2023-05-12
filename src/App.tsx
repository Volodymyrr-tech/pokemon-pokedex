import { useState, useEffect } from 'react'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
// import { bi-caret-left-fill } from 'react-bootstrap-icons'
import Pokemon from './Types/interfaces'
import PokeCard from './components/PokeCard'
import PokeDetails from './components/PokeDetails'
import useWindowWidth from './Utils/winWidth'
import './app.css'

import { useAppDispatch, useAppSelector } from './app/hooks.ts'
import { added } from './features/pokemons/pokemonSlice.ts'
import { useGetPokemonOffsetQuery } from './features/apiSlice/apiSlice.ts'

const App: React.FC = () => {
  const [shown, setShown] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const windowWidth = useWindowWidth()
  const { data, error, isLoading } = useGetPokemonOffsetQuery(offset, {
    refetchOnMountOrArgChange: true,
  })
  const allPokemons = useAppSelector((state) => state.pokemonList.list)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(added(data))
    }
  }, [data, dispatch])

  if (isLoading) {
    // Відображаємо індикатор завантаження
    return <div>Loading...</div>
  }

  if (error) {
    // Відображаємо повідомлення про помилку
    return <div>Error: {error.message}</div>
  }

  if (data) {
    // Відображаємо дані
    console.log(data)
  }

  /////////////////////////
  const handleClick = (id: number) => {
    setShown(id)
  }

  const renderPokemonCards = () => {
    const columnCount = windowWidth >= 992 ? 3 : 2
    const rowCount = Math.ceil(data.length / columnCount)

    return [...Array(columnCount)].map((_, colIndex) => (
      <Col lg={2} md={6} sm={6} key={colIndex} className="mb-4">
        {data
          .slice(colIndex * rowCount, (colIndex + 1) * rowCount)
          .map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleClick(pokemon.id)}
            />
          ))}
      </Col>
    ))
  }

  return (
    <div
      style={{
        transform: 'scale(0.7)',
        transformOrigin: 'top left',
        width: '142.86%', // 100 / 0.7 = 142.86
        height: '142.86%',
        overflow: 'auto',
      }}
    >
      <Container>
        <Row className="my-4">
          <Col md={12}>
            <Card>
              <Card.Title>
                <h1
                  style={{
                    textAlign: 'center',
                  }}
                  className="fw-bold"
                >
                  Pokedex
                </h1>
              </Card.Title>
            </Card>
          </Col>
        </Row>
        <Row>
          {renderPokemonCards()}
          <Col lg={6} md={12} sm={12} className="mb-4">
            {shown && (
              <PokeDetails
                pokemon={data.find((item) => item.id === shown) || undefined}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col lg={1} md={2} sm={2}></Col>
          <Col lg={5} md={10} sm={10}>
            <Button
              variant="primary"
              onClick={() => {
                setOffset((prevOffset) => prevOffset + 12)
                setShown(null)
              }}
              style={{ width: '100%', height: '4rem' }}
            >
              Load more
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App

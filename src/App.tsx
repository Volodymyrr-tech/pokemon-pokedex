import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Pokemon from './Types/interfaces'
import PokeCard from './Components/PokeCard'
import PokeDetails from './Components/PokeDetails'
import Button from 'react-bootstrap/Button'
import useWindowWidth from './Utils/winWidth'
import './app.css'

const App: React.FC = () => {
  const [data, setData] = useState<Pokemon[]>([])
  const [pokemonListUrl, setPokemonListUrl] = useState('')
  const [shown, setShown] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const windowWidth = useWindowWidth()

  const handleLoading = () => {
    setOffset((prevOffset) => prevOffset + 12)
    setShown(null)
  }

  useEffect(() => {
    const limit = 12
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
    const url = `${baseUrl}?offset=${offset}&limit=${limit}`
    setPokemonListUrl(url)
  }, [offset])

  useEffect(() => {
    const getData = async () => {
      if (!pokemonListUrl) {
        return
      }
      try {
        const res = await axios.get(pokemonListUrl)
        const pokemonDataPromises = res.data.results.map(
          async (pokemon: any) => {
            const pokemonRes = await axios.get(pokemon.url)
            return {
              id: pokemonRes.data.id,
              name: pokemonRes.data.name,
              img: pokemonRes.data.sprites.front_default,
              types: pokemonRes.data.types.map((type: any) => type.type.name),
              weight: pokemonRes.data.weight,
              HP: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'hp'
              ).base_stat,
              attack: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'attack'
              ).base_stat,
              defense: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'defense'
              ).base_stat,
              SPattack: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'special-attack'
              ).base_stat,
              SPdefense: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'special-defense'
              ).base_stat,
              speed: pokemonRes.data.stats.find(
                (stat: any) => stat.stat.name === 'speed'
              ).base_stat,
              total_moves: pokemonRes.data.moves.length,
            }
          }
        )

        const pokemonData = await Promise.all(pokemonDataPromises)
        setData(pokemonData)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [pokemonListUrl])

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
          <Col lg={6} md={12} sm={12}>
            <Button
              variant="primary"
              onClick={handleLoading}
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

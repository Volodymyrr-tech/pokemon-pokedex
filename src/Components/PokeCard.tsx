import Card from 'react-bootstrap/Card'
import Pokemon from '../Types/interfaces'
import Badge from 'react-bootstrap/Badge'

const PokeCard: React.FC<{ pokemon: Pokemon; onClick: () => void }> = ({
  pokemon,
  onClick,
}) => {
  const { id, img, name, types } = pokemon
  return (
    <Card key={id} onClick={onClick} className="my-2">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title className="text-capitalize fw-bold">{name}</Card.Title>
        {types.map((type) => (
          <Badge key={type} variant="primary" className="mr-2">
            {type}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  )
}

export default PokeCard

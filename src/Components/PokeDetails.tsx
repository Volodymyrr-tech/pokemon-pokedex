import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Pokemon from '../Types/interfaces'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../app.css'

const PokeDetails: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const {
    id,
    img,
    name,
    types,
    weight,
    attack,
    defense,
    HP,
    SPattack,
    SPdefense,
    speed,
    total_moves,
  } = pokemon
  const type = types[0]

  return (
    <Container
      key={id}
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100%' }}
    >
      <Row>
        <Col>
          <Card
            className="mx-auto"
            style={{
              maxWidth: '50%',
              minWidth: '300px',
              width: '100%',
            }}
          >
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>
                <h1 className="text-capitalize fw-bolder">
                  {name} #{id}
                </h1>
              </Card.Title>
              <Table className="table-bordered">
                <tbody>
                  <tr>
                    <th className="border">Type</th>
                    <th className="border text-capitalize">{type}</th>
                  </tr>
                  <tr>
                    <th className="border">Attack</th>
                    <th className="border">{attack}</th>
                  </tr>
                  <tr>
                    <th className="border">Defense</th>
                    <th className="border">{defense}</th>
                  </tr>
                  <tr>
                    <th className="border">HP</th>
                    <th className="border">{HP}</th>
                  </tr>
                  <tr>
                    <th className="border">SP Attack</th>
                    <th className="border">{SPattack}</th>
                  </tr>
                  <tr>
                    <th className="border">SP Defense</th>
                    <th className="border">{SPdefense}</th>
                  </tr>
                  <tr>
                    <th className="border">Speed</th>
                    <th className="border">{speed}</th>
                  </tr>
                  <tr>
                    <th className="border">Weight</th>
                    <th className="border">{weight}</th>
                  </tr>
                  <tr>
                    <th className="border">Total</th>
                    <th className="border">{total_moves}</th>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PokeDetails

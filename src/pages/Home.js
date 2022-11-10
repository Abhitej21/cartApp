/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'rsuite';


const homeContent = [
  {
    "id": "fgsa2142fa",
    "name": "Keyboards",
    "description": "Buy different keyboard from any brand available",
    "linkTo": "/keyboards"
  },
  {
    "id": "xasgy42fa",
    "name": "Headphones",
    "description": "Find best-fit for your ears",
    "linkTo": "/headphones"
  }
];

const Home = () => {
    
  return (
    
    <Container>
      <Row>
        {homeContent.map(item => (
          <Col componentClass={Link} key={item.id} to={`/category/${item.id}`}
           className='text-dark text-center mb-3 py-5 bg-white shadow-sm rounded-lg flex-fill'>
            <h2 className='h3'>{item.name}</h2>
            <div>{item.description}</div>
          </Col>
        ))}
      </Row>
    </Container>

    // <div className='d-flex align-items-center justify-content-center text-center'>
    //   {homeContent.map(item => {
    //     return (
    //     <Nav.Item componentClass={Link} to={`/${item["id"]}`}>
    //     <Item id={item["id"]} name={item["name"]} description={item["description"]}/>
    //     </Nav.Item>
    //     );
    //   })}
    // </div> 
    
  )
}

export default Home;
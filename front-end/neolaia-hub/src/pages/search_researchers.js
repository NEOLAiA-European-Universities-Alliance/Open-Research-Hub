import React, { useState } from 'react';
import SearchForm from '../components/search_form';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const SearchResearchers = () => {
    const [results, setResults] = useState([]);
  
    const handleSearch = async (searchParams) => {
      try {
        const response = await axios.post('/api/search', searchParams);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    return (
        <Container>
          <Row className="my-3">
            <Col>
              <SearchForm onSearch={handleSearch} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Search Results</h3>
              {results.map((result) => (
                <div key={result.id}>{result.name}</div>
              ))}
            </Col>
          </Row>
        </Container>
      );
};  

export default SearchResearchers;
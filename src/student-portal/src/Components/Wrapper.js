import { 
    Container, Row, Col
} from 'react-bootstrap';

function Wrapper(props) {
    return(
        <Container fluid={true}>
            <Row className="justify-content-center text-center">
                <Col md={10}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}

export default Wrapper;
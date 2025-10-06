import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    async function sendData(e) {
        e.preventDefault();
        try {
            await axios.post('https://68e36ed58e14f4523dad5c8e.mockapi.io/fruits', { name, price });
            toast.success("🍓 Fruit Added Successfully!");
            setTimeout(() => {
                navigate('/');
            }, 1200);
        } catch (error) {
            console.log(error);
            toast.error('❌ Failed to add fruit. Please try again.');
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4 text-primary fw-bold">
                                🥝 Create Fruit Listing 🍅
                            </h2>
                            <Form onSubmit={sendData}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label className="fw-semibold">Fruit Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter fruit name"
                                        onChange={(e) => setName(e.target.value)}
                                        className="py-2"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPrice">
                                    <Form.Label className="fw-semibold">Fruit Price:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="py-2"
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        size="lg"
                                        className="rounded-pill fw-bold"
                                    >
                                        ✅ Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position="top-center" autoClose={1500} />
        </Container>
    );
};

export default Create;

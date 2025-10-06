import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
    const stored = JSON.parse(localStorage.getItem('fruit'));
    const navigate = useNavigate();

    // guard: if no stored item, redirect back to list
    if (!stored) {
        navigate('/');
        return null;
    }

    const [id] = useState(stored.id);
    const [name, setName] = useState(stored.name);
    const [price, setPrice] = useState(stored.price);

    async function updateData(e) {
        e.preventDefault();
        try {
            await axios.put(
                `https://68e36ed58e14f4523dad5c8e.mockapi.io/fruits/${id}`,
                { name, price }
            );
            toast.success('🍓 Fruit updated successfully!');
            setTimeout(() => navigate('/'), 1200);
        } catch (error) {
            console.error(error);
            toast.error('❌ Failed to update. Please try again.');
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: '500px' }}>
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 text-primary fw-bold">
                         Update Fruit Listing 🍅
                    </h2>

                    <Form onSubmit={updateData}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="fw-semibold">Fruit Name:</Form.Label>
                            <Form.Control
                                value={name}
                                type="text"
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                                className="py-2"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPrice">
                            <Form.Label className="fw-semibold">Fruit Price:</Form.Label>
                            <Form.Control
                                value={price}
                                type="number"
                                placeholder="Enter price"
                                onChange={(e) => setPrice(e.target.value)}
                                className="py-2"
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="rounded-pill fw-semibold"
                                onClick={() => navigate('/')}
                            >
                                ⬅ Back
                            </Button>

                            <Button
                                variant="warning"
                                size="lg"
                                type="submit"
                                className="rounded-pill fw-semibold text-white"
                            >
                                🔄 Update
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <ToastContainer position="top-center" autoClose={1500} />
        </Container>
    );
}

export default Update;

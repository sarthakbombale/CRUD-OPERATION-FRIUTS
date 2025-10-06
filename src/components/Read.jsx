import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Container, Table, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bolt, Trash } from "lucide-react";

function Read() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function getData() {
        try {
            const res = await axios.get("https://68e36ed58e14f4523dad5c8e.mockapi.io/fruits");
            setData(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const Edit = (fruit) => {
        localStorage.setItem("fruit", JSON.stringify(fruit));
        navigate("/update");
    };

    const deleteFruit = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this fruit?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://68e36ed58e14f4523dad5c8e.mockapi.io/fruits/${id}`);
            setData((prev) => prev.filter((f) => f.id !== id));
            toast.success("🍏 Fruit deleted successfully!");
        } catch (error) {
            console.error("Failed to delete fruit:", error);
            toast.error("❌ Could not delete the item. Please try again.");
        }
    };

    return (
        <Container className="py-5">
            <Card className="shadow-lg border-0 rounded-4">
                <Card.Body>
                    <Row className="align-items-center mb-4">
                        <Col>
                            <h2 className="text-center text-primary fw-bold mb-0">🍎 Fruit Listing</h2>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mb-3">
                        <Button
                            variant="success"
                            size="lg"
                            className="rounded-pill fw-semibold"
                            onClick={() => navigate("/create")}
                        >
                            ➕ Add New Fruit
                        </Button>
                    </div>

                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="text-muted mt-2">Loading fruits...</p>
                        </div>
                    ) : data.length > 0 ? (
                        <Table responsive bordered hover className="align-middle text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((fruit, index) => (
                                    <tr key={fruit.id}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{fruit.name}</td>
                                        <td>💰 {fruit.price}</td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="rounded-circle"
                                                onClick={() => Edit(fruit)}
                                                title="Edit"
                                            >
                                                <Bolt size={18} />
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="rounded-circle"
                                                onClick={() => deleteFruit(fruit.id)}
                                                title="Delete"
                                            >
                                                <Trash size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted py-4 mb-0">No fruits found 🍋</p>
                    )}
                </Card.Body>
            </Card>

            <ToastContainer position="top-center" autoClose={2000} />
        </Container>
    );
}

export default Read;

/** @format */
import HOC from "../Layout/HOC";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getApi } from "../Repository/Repository";


const UserProfile = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState({});

    const fetchHandler = () => {
        getApi({
            url: `api/user/getProfile`,
            setResponse,
        });
    };


    useEffect(() => {
        fetchHandler();
    }, []);

    return (
        <>
            <section className="sectionCont">
                <Row>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={response?.user?.username} disabled />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="text" value={response?.user?.email} disabled />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control type="text" value={response?.user?.createdAt?.slice(0, 10)} disabled />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="dark" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </section>
        </>
    );
};

export default HOC(UserProfile);
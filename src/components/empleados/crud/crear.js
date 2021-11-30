import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from "../../Loading/Loading";
import '../empleados.css';
import MessagePrompt from '../../prompts/message';

export default class EmpleadosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rediret: false,
            message: {
                text: '',
                show: false,
            }, 
            loading: false, 
            empleados: {  
                nombre: "",
                apellido_p: "",
                apellido_m: "",
                telefono: "",
                mail: "",
                direccion: "",
            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
    }
    setValue(index, value) {
        this.setState({
            empleados: {
                ...this.state.empleados,
                [index]: value,
            },
        });
    }

    guardarEmpleados() {
        this.setState({ loading: true });
        request
        .post('/empleados', this.state.empleados)
        .then((response) => {
            if(response.data.exito) {
                this.setState({
                    rediret: response.data.exito,
                    message: {
                        text: response.data.msg,
                        show: true,
                    },
                });
            }
            this.setState({ loading: false });
            
            })     
        .catch((err) => {          
            this.setState({ loading: true });
        });
    }
onExitedMessage(){
    if(this.state.rediret) this.props.changeTab('buscar');
}

    render() { 
        return (  
            <Container id="empleados-crear-container">
                <MessagePrompt text={this.state.message.text}
                show= {this.state.message.show}
                duration={2000}
                onExited = {this.onExitedMessage}
                 />
                <Loading show={this.state.loading} />
                <Row>
                    <h1> Crear Empleados </h1>
                </Row>
                <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('nombre', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('apellido_p', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('apellido_m', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('telefono', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('mail', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control 
                            onChange={(e) => this.setValue('direccion', e.target.value)}
                        />
                    </Form.Group>
                                       
                    <Button variant="primary" 
                    onClick={() => console.log(this.guardarEmpleados())} 
                    >
                        Guardar Empleado
                    </Button>
                </Form>
                </Row>
            </Container>
        );
    }
}
 


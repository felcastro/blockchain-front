import React, { Component } from 'react';
import { Button, Col, Container, Row, Table, InputGroup, InputGroupAddon, Input, Form, FormGroup, Label, FormFeedback, FormText } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import './home.sass';
import Blockchain from './blockchain/Blockchain';

class Home extends Component {

    constructor(props) {
        super(props);
        let bc = new Blockchain(2);
        this.state = {
            blockchain: bc,
            currentBlock: 0,
            inputDifficulty: bc.difficulty,
            inputAmount: 0,
            inputSender: '',
            inputReceiver: '',
            transactions: []
        };
    }

    newBlockchain = () => {
        this.setState({
            blockchain: new Blockchain(this.state.blockchain.difficulty)
        });
        this.setState({currentBlock: 0});
    }

    mineBlock = () => {
        this.state.blockchain.mineBlock(this.state.transactions);
        this.setState({
            blockchain: this.state.blockchain,
            transactions: []
        });
    }
    
    changeDifficulty = (e) => {
        e.preventDefault();
        if (this.state.inputDifficulty > 0 && this.state.inputDifficulty <= 5) {
            let blockchain = this.state.blockchain
            blockchain.difficulty = parseInt(this.state.inputDifficulty);
            this.setState({blockchain});
        }
    }
    
    isChainValid = () => {
        if (this.state.blockchain.chain.length <= 1 || this.state.blockchain.isChainValid()) {
            return (<span className="text-success">Chain Válida</span>)
        } else {
            return (<span className="text-success">Chain Inválida</span>)
        }
    }

    addTransaction = (e) => {
        e.preventDefault();
        let transactions = this.state.transactions.slice();
        transactions.push({
            sender: this.state.inputSender,
            receiver: this.state.inputReceiver,
            amount: this.state.inputAmount
        });
        this.setState({transactions});
    }

    render() {
        return (
            <div className="home-content pt-4">
                <Container>
                    <Row>
                        <Col xs="12" md="6">
                            <div className="bc-area mb-3 p-3">
                                <div className="pb-2">
                                    <Form  onSubmit={(e) => this.addTransaction(e)}>
                                        <span>Adicionar Transferências</span>
                                        <FormGroup>
                                            <Label for="difficulty">Conta A</Label>
                                            <Input type="text" required
                                            onChange={(e) => this.setState({inputSender: e.target.value})}  
                                            value={this.state.inputSender}/>
                                            <FormFeedback>Valor Inválido</FormFeedback>
                                            <FormText>Identificador da conta do remetente.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="difficulty">Conta B</Label>
                                            <Input type="text" required
                                            onChange={(e) => this.setState({inputReceiver: e.target.value})}  
                                            value={this.state.inputReceiver}/>
                                            <FormFeedback>Valor Inválido</FormFeedback>
                                            <FormText>Identificador da conta do destinatário.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="difficulty">Valor</Label>
                                            <Input min={0} type="number" step="1"
                                            onChange={(e) => this.setState({inputAmount: e.target.value})}  
                                            value={this.state.inputAmount}/>
                                            <FormFeedback>Valor Inválido</FormFeedback>
                                            <FormText>Valor de transferência.</FormText>
                                        </FormGroup>
                                        <Button color="primary" type="submit">Adicionar</Button>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6">
                            <div className="bc-area mb-3 p-3 table-responsive">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Remetende</th>
                                            <th>Destinatário</th>
                                            <th>Quantia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.transactions.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.sender}</td>
                                                <td>{item.receiver}</td>
                                                <td>{item.amount}</td>
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="bc-area mb-3 p-3">
                                <Row>
                                    <Col xs="12">
                                        <div className="pb-2 mb-2 border-bottom">
                                            <Form onSubmit={(e) => this.changeDifficulty(e)}>
                                                <FormGroup>
                                                    <Label for="difficulty">Dificuldade</Label>
                                                    <Input min={1} max={5} type="number" step="1" required
                                                    onChange={(e) => this.setState({inputDifficulty: e.target.value})}  
                                                    value={this.state.inputDifficulty}/>
                                                    <FormFeedback>Valor Inválido</FormFeedback>
                                                    <FormText>Dificuldade utilizada na mineração.</FormText>
                                                </FormGroup>
                                                <Button color="primary" type="submit">Atualizar</Button>
                                            </Form>
                                        </div>
                                    </Col>
                                    <Col xs="6" md="4">
                                        <Button color="primary" onClick={() => this.newBlockchain()}>Resetar</Button>
                                    </Col>
                                    <Col xs="6" md="4">
                                        <Button color="primary" onClick={() => this.mineBlock()}>Minerar</Button>
                                    </Col>
                                    <Col xs="6" md="4">
                                        {this.isChainValid()}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs="12">
                            <div className="bc-area mb-3 p-3">
                                <Row>
                                { 
                                this.state.blockchain.chain.map((item) => {
                                    return <Col  xs="4" md="2" lg="1" key={item.index}>
                                        <div className={"py-3 mb-3 text-center " + (item.index === this.state.currentBlock ? 'bc-block-selected' : 'bc-block')} onClick={() => this.setState({currentBlock: item.index})}>
                                            <span className="text-white">{item.index}</span>
                                        </div>
                                    </Col>
                                })
                                }
                                </Row>
                            </div>
                        </Col>
                        <Col xs="12">
                            <div className="bc-area mb-3 p-3 table-responsive">
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>Index</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].index}</td>
                                    </tr>
                                    <tr>
                                        <td>Timestamp</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].timestamp.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Data</td>  
                                        <td>{JSON.stringify(this.state.blockchain.chain[this.state.currentBlock].data)}</td>
                                    </tr>
                                    <tr>
                                        <td>Previous Hash</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].previousHash.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Hash</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].hash.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Nonce</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].nonce}</td>
                                    </tr>
                                    <tr>
                                        <td>Dificuldade</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].difficulty}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default Home;
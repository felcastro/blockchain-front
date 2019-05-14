import React, { Component } from 'react';
import { Button, Col, Container, Row, Table, Input, Form, FormGroup, Label, FormFeedback, FormText } from 'reactstrap';
import './home.sass';
import Blockchain from './blockchain/Blockchain';
import Transaction from './blockchain/Transaction';

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
            inputReward: bc.miningReward
        };
    }

    newBlockchain = () => {
        this.setState({
            blockchain: new Blockchain(this.state.blockchain.difficulty)
        });
        this.setState({currentBlock: 0});
    }

    mineBlock = () => {
        this.state.blockchain.mineBlock("lol");
        this.setState({
            blockchain: this.state.blockchain
        });
    }
    
    changeDifficulty = (e) => {
        e.preventDefault();
        if (this.state.inputDifficulty > 0 && this.state.inputDifficulty <= 5) {
            let blockchain = this.state.blockchain;
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
        this.state.blockchain.addTransaction( new Transaction(this.state.inputSender, this.state.inputReceiver, this.state.inputAmount) );
        this.setState({blockchain: this.state.blockchain});
    }
    
    changeReward = (e) => {
        e.preventDefault();
        let blockchain = this.state.blockchain;
        blockchain.miningReward = this.state.inputReward;
        this.setState({blockchain});
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
                                        this.state.blockchain.pendingTransactions.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.fromAddress}</td>
                                                <td>{item.toAddress}</td>
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
                                        <div className="pb-2 mb-2 border-bottom">
                                            <Form onSubmit={(e) => this.changeReward(e)}>
                                                <FormGroup>
                                                    <Label for="reward">Prêmio</Label>
                                                    <Input min={0} type="number" step="1" required
                                                    onChange={(e) => this.setState({inputReward: e.target.value})}  
                                                    value={this.state.inputReward}/>
                                                    <FormFeedback>Valor Inválido</FormFeedback>
                                                    <FormText>Prêmio concedido a quem minerar um bloco.</FormText>
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
                                this.state.blockchain.chain.map((item, index) => {
                                    return <Col  xs="4" md="2" lg="1" key={index}>
                                        <div className={"py-3 mb-3 text-center " + (index === this.state.currentBlock ? 'bc-block-selected' : 'bc-block')} onClick={() => this.setState({currentBlock: index})}>
                                            <span className="text-white">{index}</span>
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
                                        <td>Timestamp</td>
                                        <td>{this.state.blockchain.chain[this.state.currentBlock].timestamp.toString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Data</td>  
                                        <td>{JSON.stringify(this.state.blockchain.chain[this.state.currentBlock].transactions)}</td>
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
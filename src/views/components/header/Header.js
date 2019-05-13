import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import HeaderLinks from './HeaderLinks';

class Header extends Component {

    constructor(props) {
        super(props);
        const isLogged = sessionStorage.userCredentials !== undefined
        this.state = {
            isOpen: false,
            logged: isLogged
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    links = () => {
        return(
            <HeaderLinks />
        )
    }

    render() {
        return (
            <Navbar className="fixed-top" color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Blockchain</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">About</NavLink>
                            </NavItem>
                            {this.links()}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
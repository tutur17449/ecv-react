import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/">
          <span className="navbar-brand">Accueil</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/articles">
                <span className="nav-link">Articles</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/categories">
                <span className="nav-link">Categories</span>
              </Link>
            </NavItem>
          </Nav>
          {user ? (
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                {user.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/profil">
                    <span className="dropdown-item">Mon profil</span>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/">
                    <span className="dropdown-item">Se déconnecter</span>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav caret>
                Nous rejoindre
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/login">
                    <span className="dropdown-item">Se connecter</span>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/register">
                    <span className="dropdown-item">S'inscrire</span>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

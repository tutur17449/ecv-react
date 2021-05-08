import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import Logo from "../../assets/images/logo.png";
import "./styles.scss";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md">
        <Link to="/">
          <img src={Logo} className="navbar-brand logo" alt="Zapple logo" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" activeClassName="nav-link-current" exact>
                <span className="nav-link">Accueil</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/articles" activeClassName="nav-link-current">
                <span className="nav-link">Articles</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/categories" activeClassName="nav-link-current">
                <span className="nav-link">Categories</span>
              </NavLink>
            </NavItem>
          </Nav>
          {user ? (
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                {user.prenom} {user.nom} 
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/profile">
                    <span className="dropdown-item">Mon profil</span>
                  </Link>
                </DropdownItem>
                <DropdownItem onClick={logout}>
                  <span className="dropdown-item">Se déconnecter</span>
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

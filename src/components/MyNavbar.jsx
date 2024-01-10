import React, { useState } from "react";
import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyNavbar = ({ showSearchResult }) => {
	const [searchString, setSearchString] = useState("")
	const location = useLocation()
	const navigate = useNavigate()

	const searchStringHandler = (e) => {
		if (e.keyCode === 13) {
			// WHEN ENTER KEY IS PRESSED
			showSearchResult(searchString);
		} else {
			setSearchString(e.currentTarget.value);
		}
	};

	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
			<Navbar.Brand as={Link} to="/">
				<img
					src="assets/logo.png"
					alt="logo"
					style={{ width: "100px", height: "55px" }}
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link
						as={Link}
						to="/"
						className={`font-weight-bold ${isActive("/") && "active"}`}
					>
						Home
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/tv-shows"
						className={`font-weight-bold ${isActive("/tv-shows") && "active"}`}
					>
						TV Shows
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/movies"
						className={`font-weight-bold ${isActive("/movies") && "active"}`}
					>
						Movies
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/recently-added"
						className={`font-weight-bold ${isActive("/recently-added") &&
							"active"}`}
					>
						Recently Added
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/my-list"
						className={`font-weight-bold ${isActive("/my-list") && "active"}`}
					>
						My List
					</Nav.Link>
				</Nav>
				<span className="d-flex align-items-center">
					<InputGroup className="icons">
						<FormControl
							placeholder="Search and press enter"
							aria-label="search"
							aria-describedby="basic-addon1"
							onKeyDown={searchStringHandler}
							onChange={searchStringHandler}
							value={searchString}
						/>
					</InputGroup>
					<div id="kids">KIDS</div>
					<i className="fa fa-bell icons"></i>
					<i className="fa fa-user icons"></i>
				</span>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MyNavbar;

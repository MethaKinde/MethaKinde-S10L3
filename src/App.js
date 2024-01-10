import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import MovieList from "./components/MovieList";
import TvShow from "./components/TvShow";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	const [gallery1, setGallery1] = useState([])
	const [gallery2, setGallery2] = useState([])
	const [gallery3, setGallery3] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [comments, setComments] = useState([])

	const OMDB_URL = "http://www.omdbapi.com/?apikey=7dcf0c13";

	useEffect(() => {
		fetchMovies()
	}, []);

	const fetchMovies = async () => {
		try {
			const response1 = await fetch(OMDB_URL + "&s=harry%20potter")
			const data1 = await response1.json()
			if (data1.Response === "True") {
				setGallery1(data1.Search)
			} else {
				setError(true)
			}

			const response2 = await fetch(OMDB_URL + "&s=avengers")
			const data2 = await response2.json()
			if (data2.Response === "True") {
				setGallery2(data2.Search)
			} else {
				setError(true)
			}

			const response3 = await fetch(OMDB_URL + "&s=star%20wars")
			const data3 = await response3.json()
			if (data3.Response === "True") {
				setGallery3(data3.Search)
			} else {
				setError(true)
			}

			setLoading(false)
		} catch (err) {
			setError(true)
			console.log("An error has occurred:", err)
		}
	};

	const showSearchResult = async (searchString) => {
		if (searchString === "") {
			setError(false)
			setSearchResults([])
			fetchMovies()
		} else {
			try {
				const response = await fetch(OMDB_URL + "&s=" + searchString)
				if (response.ok) {
					const data = await response.json()
					if (data.Response === "True") {
						setSearchResults(data.Search)
						setError(false)
					} else {
						setError(true)
					}
				} else {
					setError(true)
					console.log("an error occurred")
				}
			} catch (error) {
				setError(true)
				console.log(error)
			}
		}
	};

	const fetchComments = async (movieID) => {
		const COMMENTS_URL =
			"https://striveschool-api.herokuapp.com/api/comments/";
		try {
			const response = await fetch(COMMENTS_URL + movieID, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTljMTVlYWUwZGQxZDAwMTgyZDE4MzUiLCJpYXQiOjE3MDQ3MjgwNDIsImV4cCI6MTcwNTkzNzY0Mn0.d3NYogX9x1Trv4HDeBugXlpKHp-yZ-GurJVZjxwKc_w",
				},
			});
			if (response.ok) {
				const commentsData = await response.json()
				setComments(commentsData)
			} else {
				console.log("an error occurred")
			}
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<BrowserRouter>
			<div>
				<MyNavbar showSearchResult={showSearchResult} />
				<div className="flex-grow-1">
					<Routes>
						<Route path="/tv-show" element={<TvShow />} />
					</Routes>
				</div>
				<Container fluid className="px-4">
					<div className="d-flex justify-content-between">
						<div className="d-flex">
							<h2 className="mb-4">TV Shows</h2>
							<div className="ml-4 mt-1">
								<Dropdown>
									<Dropdown.Toggle
										style={{ backgroundColor: "#221f1f" }}
										id="dropdownMenuButton"
										className="btn-secondary btn-sm dropdown-toggle rounded-0"
									>
										Genres
									</Dropdown.Toggle>
									<Dropdown.Menu bg="dark">
										<Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
						<div>
							<i className="fa fa-th-large icons"></i>
							<i className="fa fa-th icons"></i>
						</div>
					</div>
					{error && (
						<Alert variant="danger" className="text-center">
							An error has occurred, please try again!
						</Alert>
					)}
					{searchResults?.length > 0 && (
						<MovieList
							title="Search results"
							fetchComments={fetchComments}
							comments={comments}
							movies={searchResults}
						/>
					)}
					{!error && !searchResults?.length > 0 && (
						<>
							<MovieList
								title="Harry Potter"
								loading={loading}
								fetchComments={fetchComments}
								comments={comments}
								movies={gallery1.slice(0, 6)}
							/>
							<MovieList
								title="Avengers"
								loading={loading}
								fetchComments={fetchComments}
								comments={comments}
								movies={gallery2.slice(0, 6)}
							/>
							<MovieList
								title="Star Wars"
								loading={loading}
								fetchComments={fetchComments}
								comments={comments}
								movies={gallery3.slice(0, 6)}
							/>
						</>
					)}
					<MyFooter />
				</Container>
			</div>
		</BrowserRouter>
	);
};

export default App;
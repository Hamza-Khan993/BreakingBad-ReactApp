import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Cards from './components/layout/Cards'
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import axios from 'axios'
import Search from './components/layout/Search';
import Spinner from './components/layout/Spinner';

import './App.css';
import Pagination from './components/layout/Pagination';
import { Chip } from '@material-ui/core';
import Users from './components/users/Users';

const App = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [charPerPage] = useState(10)
  const [filter, setFilter] = useState('All')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const getCharacters = async () => {
    setLoading(true)
    const res = await axios.get(`https://www.breakingbadapi.com/api/characters`)

    setUsers(res.data);
    setFilteredUsers(res.data)

    setLoading(false)
  };

  const searchCharacters = async (text) => {
    setLoading(true)
    const res = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${text}`)

    setFilteredUsers(res.data)
    setLoading(false)
  };
  const clearUsers = () => {
    setFilteredUsers(users)
  }
  const indexOfLastChar = currentPage * charPerPage
  const indexOfFirstChar = indexOfLastChar - charPerPage
  const currentChars = filteredUsers.slice(indexOfFirstChar, indexOfLastChar)

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    if (filter === "All") setFilteredUsers(users)
    else setFilteredUsers(users.filter((user) => {
      return user.category.split(", ").includes(filter)
    }))
  }, [filter, users])

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <Router>
      <div>
        <Navbar title="Breaking Bad React app" icon="fab  mx-1" />
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
              <div className="m-3 text-center">
                <Search
                  searchCharacters={searchCharacters} clearUsers={clearUsers} />
                <Chip
                  label="All"
                  clickable
                  color="primary"
                  onClick={() => {
                    setFilter('All')
                    setCurrentPage(1)
                  }}
                  variant={filter === 'All' ? 'default' : 'outlined'}
                  style={{ marginLeft: "20px" }}
                />
                <Chip
                  label="Breaking Bad"
                  clickable
                  color="primary"
                  onClick={() => {
                    setFilter('Breaking Bad')
                    setCurrentPage(1)
                  }}
                  variant={filter === 'Breaking Bad' ? 'default' : 'outlined'}
                  style={{ marginLeft: "20px" }}
                />
                <Chip
                  label="Better Call Saul"
                  clickable
                  color="primary"
                  onClick={() => {
                    setFilter('Better Call Saul')
                    setCurrentPage(1)
                  }}
                  variant={filter === 'Better Call Saul' ? 'default' : 'outlined'}
                  style={{ marginLeft: "20px" }}
                />
                <div >
                  {loading ? <Spinner /> :
                    <Users users={currentChars} />
                  }
                  {/* {currentChars.map(character => <Cards key={character.id} {...character} />)} */}
                </div>
                <Pagination
                  charPerPage={charPerPage}
                  totalChars={filteredUsers.length}
                  paginate={paginate} />
              </div>
            </Fragment>

          )} />
          <Route exact path="/about" component={About} />

        </Switch>
      </div>
    </Router>

  )
}

export default App

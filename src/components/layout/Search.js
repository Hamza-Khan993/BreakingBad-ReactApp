import React, { useState } from 'react'

const Search = ({ searchCharacters, clearUsers }) => {
    const [text, setText] = useState("")
    const [showClear, setShowClear] = useState(false)

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        searchCharacters(text)
        setShowClear(true)
    }
    return (
        <div>
            <form onSubmit={onSubmit} className="form" style={{ display: "flex" }}>
                <input
                    type="text"
                    name="text"
                    placeholder="Search Character ..."
                    value={text}
                    onChange={onChange}
                    style={{ flexGrow: 1 }}
                />
                {showClear && <button className="btn btn-primary btn-lg" style={{ margin: "auto 10px" }} onClick={() => {
                    clearUsers()
                    setText('')
                    setShowClear(false)
                }}>Clear </button>}
                <input
                    type="submit"
                    value="Search Characters"
                    className="btn btn-dark"
                    style={{ margin: "auto 10px" }}
                />
            </form>


        </div>
    )

}

export default Search

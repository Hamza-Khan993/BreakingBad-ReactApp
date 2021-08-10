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
                <input
                    type="submit"
                    value="Search Characters"
                    className="btn btn-dark"
                    style={{ marginLeft: "10px" }}
                />
            </form>

            {showClear && <button className="btn btn-light btn-block m-3" onClick={() => {
                clearUsers()
                setText('')
                setShowClear(false)
            }}>Back to Characters</button>}
        </div>
    )

}

export default Search

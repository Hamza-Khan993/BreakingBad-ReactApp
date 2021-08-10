import React from 'react'
import Cards from '../layout/Cards'

const Users = ({ users }) => {
    return (
        <div className="grid-4 text-center">
            {users.map(({ id, name, img, status, nickname, birthday, portrayed, occupation, appearance }) => (
                <Cards
                    key={id}
                    id={id}
                    name={name}
                    img={img}
                    status={status}
                    nickname={nickname}
                    birthday={birthday}
                    portrayed={portrayed}
                    occupation={occupation}
                    appearance={appearance}
                />
            ))}
        </div>
    )

}




export default Users

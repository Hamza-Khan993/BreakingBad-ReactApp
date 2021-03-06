import React from 'react';

const Pagination = ({ charPerPage, totalChars, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalChars / charPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination justify-content-center pagination-lg m-3'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
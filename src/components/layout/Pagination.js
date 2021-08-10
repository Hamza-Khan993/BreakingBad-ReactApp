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
                        <a onClick={() => paginate(number)} href='#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
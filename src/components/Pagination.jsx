import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    const firstPage = () => {
        setCurrentPage(1);
    };
    const lastPage = () => {
        setCurrentPage(nPages);
    };

    return (
        <nav>
            <ul className='pagination justify-content-center pt-5'>
                <li className="page-item">
                    <button className="page-link"
                       onClick={firstPage}
                       disabled={currentPage === 1}>
                        First
                    </button>
                </li>
                <li className="page-item">
                    <button className="page-link"
                       onClick={prevPage}
                       disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <button onClick={() => setCurrentPage(pgNumber)}
                           className='page-link'>
                            {pgNumber}
                        </button>
                    </li>

                ))}
                <li className="page-item">
                    <button className="page-link"
                       onClick={nextPage}
                       disabled={currentPage === nPages}>
                        Next
                    </button>
                </li>
                <li className="page-item">
                    <button className="page-link"
                       onClick={lastPage}
                       disabled={currentPage === nPages}>
                        Last
                    </button>
                </li>
            </ul>
            <span className="d-flex justify-content-center pt-2">
                Page {currentPage} of {nPages}
            </span>
        </nav>
    )
}

export default Pagination;
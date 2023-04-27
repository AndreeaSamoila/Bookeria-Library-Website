import React from 'react'
import {Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";


const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const theme = useTheme();
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
                       disabled={currentPage === 1}
                            style={{
                                backgroundColor:
                                    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.16)" : undefined,
                                color:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.primary.contrastText
                                        : "#01579b",
                            }}
                    >
                        First
                    </button>
                </li>
                <li className="page-item">
                    <button className="page-link"
                       onClick={prevPage}
                       disabled={currentPage === 1}
                            style={{
                                backgroundColor:
                                    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.16)" : undefined,
                                color:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.primary.contrastText
                                        : "#01579b",
                            }}>
                        Previous
                    </button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <button onClick={() => setCurrentPage(pgNumber)}
                           className='page-link'
                                style={{
                                    backgroundColor:
                                        currentPage === pgNumber
                                            ? "rgba(255, 255, 255, 0.16)"
                                            : theme.palette.mode === "dark"
                                                ? "#333"
                                                : undefined,
                                    color:
                                        currentPage === pgNumber
                                            ? "#01579b"
                                            : theme.palette.mode === "dark"
                                                ? "#fff"
                                                : "#01579b",
                                }}>
                            {pgNumber}
                        </button>
                    </li>

                ))}
                <li className="">
                    <button className="page-link"
                       onClick={nextPage}
                       disabled={currentPage === nPages}
                            style={{
                                backgroundColor:
                                    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.16)" : undefined,
                                color:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.primary.contrastText
                                        : "#01579b",
                            }}>
                        Next
                    </button>
                </li>
                <li className="page-item">
                    <button className="page-link"
                       onClick={lastPage}
                       disabled={currentPage === nPages}
                            style={{
                                backgroundColor:
                                    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.16)" : undefined,
                                color:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.primary.contrastText
                                        : "#01579b",
                            }}>
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
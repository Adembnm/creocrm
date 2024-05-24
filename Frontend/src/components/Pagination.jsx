import React from 'react'
import ReactPaginate from 'react-paginate';
import { useStateContext } from '../contexts/ContextProvider';
import { themeColors } from '../data/dummy';

function Pagination(props) {
    const { pageCount, onPageChange } = props;
    const { currentColor } = useStateContext();

    return (
        <ReactPaginate 
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount ? Math.ceil(pageCount) : 1}
            onPageChange={(page) => onPageChange(page)}
            marginPagesDisplayed={5}
            pageRangeDisplayed={3}
            className={`pagination-container noprint ${themeColors.find(theme => theme.color === currentColor)?.name}`}
            pageClassName={'pagination-item'}
            activeClassName={`active-item`}
            forcePage={0}
            disabledClassName={'disabled'}
        />
    )
}

export default Pagination
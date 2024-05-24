import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';
import { useStateContext } from '../contexts/ContextProvider';
import NotAuthorized from '../components/NotAuthorized';
import Pagination from '../components/Pagination';
import { getEventsRequest } from '../store/events/actions';
import moment from 'moment';

const Events = () => {
  const dispatch = useDispatch();
  const { events_list, pageCount, currentPage } = useSelector(state => state.events);
  const { currentColor } = useStateContext();
  const { user } = useSelector(state => state.auth);
  const [payload, setPayload] = useState({
    page: 0,
  });

  useEffect(() => {
    if (user?.role === 1) {
      dispatch(getEventsRequest(payload));
    }
  }, [payload, dispatch, user.role]);
  
  const onPageChange = (page) => {
    console.log(page, currentPage);
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  if (user?.role > 1) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 mt-24 p-2 md:p-8">
      <div className="flex flex-start items-center mb-10">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
              Events Log
        </p>
      </div>
      <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-sm text-left'>Type</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-left'>User</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-left'>Date</th>
              <th className='px-4 py-3 text-sm text-left'>Descripition</th>
            </tr>
          </thead>
          <tbody>
            {events_list?.map(event => (
              <tr key={event._id} >
                <td className='border border-gray-100 dark:border-gray-500 px-4 py-2'>
                {
                    event.type === "add" ? <BiCommentAdd className='text-2xl text-green-600' /> :
                    event.type === "delete" ? <AiOutlineDelete className='text-2xl text-red-600' /> :
                    event.type === "edit" ? <AiOutlineEdit className='text-2xl text-blue-600' /> :
                    null
                  }
                </td>
                <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-2 dark:text-white'>{event.user?.name}</td>
                <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-2 dark:text-white'>{moment(event.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                <td className='border border-gray-100 dark:border-gray-500 px-4 py-2 dark:text-white text-xs'>{event.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
         pageCount={pageCount}
         onPageChange={(page) => onPageChange(page)}
        />
    </div>
  );
};
export default Events;

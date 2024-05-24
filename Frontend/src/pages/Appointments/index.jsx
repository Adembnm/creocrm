import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import Pagination from '../../components/Pagination';
import { deleteAppointmentRequest, getAppointmentsRequest } from '../../store/appointments/actions';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { BsCalendar, BsCalendarPlus, BsTable } from 'react-icons/bs';
import { Calendar } from '..';

const Appointments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appointments, pageCount, currentPage, totalCount } = useSelector(state => state.appointments);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const { currentColor } = useStateContext();
  const [calendarView, setCalendarView] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [payload, setPayload] = useState({
    search: '',
    page: 0,
  });
 
  useEffect(() => {
    if (user?.role < 3) {
      dispatch(getAppointmentsRequest(payload));
    }
  }, [dispatch, payload, user?.role]);

  
  const handleDeleteAppointment = () => {
    dispatch(deleteAppointmentRequest(selectedAppointmentId));
    setConfirmModal(false);
  }

  const onPageChange = (page) => {
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  if (user?.role > 1) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
             {totalCount} {t("appointments")}
        </p>
        <BsCalendarPlus className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/crm/appointments/add")} />
      </div>
      { 
        calendarView ?
        <div className="flex justify-center items-center">
          <Calendar />
        </div>
        :
        <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-left'>{t("date")}</th>
              <th className='px-4 py-3 text-sm text-left'>{t("customer")}</th>
              <th className='px-4 py-3 text-sm text-center'>{t("duration")}</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-center'>{t("description")}</th>
              <th className='px-4 py-3 text-sm'>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
              {
                appointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 text-xs sm:text-sm dark:text-white'>{moment(appointment?.date).format("DD/MM/YYYY HH:mm")}</td>
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 text-xs sm:text-sm dark:text-white text-left'>{appointment?.customer?.name}</td>
                      <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-1 text-xs sm:text-sm dark:text-white text-center'>{appointment?.duration}</td>
                      <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-1 text-xs dark:text-white text-left'>{appointment?.description}</td>
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 text-xs sm:text-sm flex justify-center items-center h-full'>
                        <AiOutlineEdit className="mx-1 my-3 text-2xl text-green-500 hover:text-green-800 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/crm/appointments/edit/${appointment?._id}`);
                                        }} />
                        <AiOutlineDelete className="mx-1 my-3 text-2xl text-red-500 hover:text-red-800 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedAppointmentId(appointment?._id);
                                          setConfirmModal(true);
                                        }} />
                      </td>
                    </tr>
                  ))
              }
          </tbody>
        </table>
        <Pagination
         pageCount={pageCount}
         onPageChange={(page) => onPageChange(page)}
        />
      </div>
      }

      <div className={`flex justify-center items-center w-screen h-screen fixed top-0 left-0 transition-all bg-black bg-opacity-25 ${confirmModal ? 'opacity-100 pointer-events-auto	' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-400 p-8 bg-white shadow-lg rounded-md">
          <p className='text-lg text-bold mb-6'>Confirm Delete?</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              Cancel
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeleteAppointment()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appointments;

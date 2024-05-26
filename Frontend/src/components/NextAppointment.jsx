import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getNextAppointmentRequest } from '../store/appointments/actions';
//import { updateAppointmentRequest } from '../store/appointments/actions';
import moment from 'moment';
import NotAuthorized from '../components/NotAuthorized';

import { useTranslation } from 'react-i18next';

function NextAppointment() {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { nextAppointment } = useSelector(state => state.appointments);
    //const { updateAppointment } = useSelector(state => state.appointments);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getNextAppointmentRequest());
      //dispatch(updateAppointmentRequest())

    } , [dispatch]);
    
    if (user?.role > 1) {
        return <NotAuthorized />
      }
        
    return (
        <div className='w-full h-72 overflow-y-auto'>
            <img src={nextAppointment?.customer?.avatar} alt={nextAppointment?.customer?.name} 
                className='w-32 h-32 object-cover rounded-full block mx-auto my-4 cursor-pointer transtion-all duration-1000 hover:border-2 hover:border-slate-50'
                onClick={() => navigate(`/crm/appointments/edit/${nextAppointment.customer?._id}`)} />
            <h3 className='text-2xl font-extrabold text-center text-slate-600 mb-3 cursor-pointer transtion-all duration-1000 hover:text-cyan-400'
                >
              {nextAppointment?.customer?.name}
            </h3>
            <p className='text-center text-slate-600 mb-3 font-bold'>{moment(nextAppointment?.date).format("dddd, DD MMMM YYYY")}</p>
            <p className='text-slate-600 mb-2'><span className='font-semibold'>{t("duration")}</span>:&nbsp;{nextAppointment?.duration}&nbsp;{t("minutes")}</p>
            <p className='text-slate-600'><span className='font-semibold'>{t("notes")}</span>:&nbsp;{nextAppointment?.description}</p>
        </div>
    )
}

export default NextAppointment
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { deleteServiceRequest, getServicesRequest } from '../../store/services/actions';

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services } = useSelector(state => state.services);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const { currentColor } = useStateContext();
  const { user } = useSelector(state => state.auth);
  const [search, setSearch] = useState('');
  const [filtredData, setFiltredData] = useState([]);
  const [categories, setCategories] = useState([]);
 
  useEffect(() => {
    if (user?.role < 3) {
      dispatch(getServicesRequest());
    }
  }, [dispatch, user.role]);

  useEffect(() => {
    if (services.length > 0) {
      if (search.length > 0) {
        setFiltredData(services.filter(service => service.name.toLowerCase().includes(search.toLowerCase())));
      } else {
        setFiltredData(services);
      }
    }
  } , [search, services]);

  useEffect(() => {
    if (filtredData.length > 0) {
      let categoriesList = [];
      filtredData.forEach(service => {
        if (!categoriesList.includes(service.category)) {
          categoriesList.push(service.category);
        }
      }
      );
      setCategories(categoriesList);
    }
  } , [filtredData]);
    
  const handleDeleteService = () => {
    dispatch(deleteServiceRequest(selectedServiceId));
    setConfirmModal(false);
  }

  if (user?.role > 2) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
             {filtredData?.length} Services
        </p>
        <AiOutlineAppstoreAdd className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/crm/services/add")} />
      </div>
      
      <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-left'>Category</th>
              <th className='px-4 py-3 text-sm text-left'>Service</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-left'>Unit</th>
              <th className='px-4 py-3 text-sm text-center'>Price</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm'>Tax</th>
              <th className='px-4 py-3 text-sm'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category =>
                <>
                  {filtredData.filter((ser) => ser.category === category).map((service, index) => (
                    <tr key={service._id}>
                      {index === 0 && <th rowSpan={filtredData.filter(ser => ser.category === category)?.length} 
                          className='hidden sm:table-cell text-xs sm:text-sm text-left px-4 py-3 border border-gray-100 dark:border-gray-500 dark:text-white'>
                            {category}
                      </th>}
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 dark:text-white'>{service.name}</td>
                      <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-1 dark:text-white'>{service.unit}</td>
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 dark:text-white text-center'>{service.price}</td>
                      <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-4 py-1 dark:text-white text-center'>{service.tax}</td>
                      <td className='border border-gray-100 dark:border-gray-500 px-4 py-1 flex justify-center items-center h-full'>
                        <AiOutlineEdit className="mx-1 my-3 text-2xl text-green-500 hover:text-green-800 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/crm/services/edit/${service?._id}`);
                                        }} />
                        <AiOutlineDelete className="mx-1 my-3 text-2xl text-red-500 hover:text-red-800 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedServiceId(service?._id);
                                          setConfirmModal(true);
                                        }} />
                      </td>
                    </tr>
                  ))}
                </>
              )
            }
          </tbody>
        </table>
      </div>

      <div className={`flex justify-center items-center w-screen h-screen fixed top-0 left-0 transition-all bg-black bg-opacity-25 ${confirmModal ? 'opacity-100 pointer-events-auto	' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-400 p-8 bg-white shadow-lg rounded-md">
          <p className='text-lg text-bold mb-6'>Confirm Delete?</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              Cancel
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeleteService()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;

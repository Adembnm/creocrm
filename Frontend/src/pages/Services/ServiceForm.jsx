import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { getUnits, settingsData } from '../../data/dummy';
import { createServiceRequest, getServiceRequest, updateServiceRequest } from '../../store/services/actions';
import { MdOutlinePostAdd } from 'react-icons/md';

const ServiceForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { service } = useSelector(state => state.services);
  const { currentColor } = useStateContext();
  const [formData, setFormData] = useState({
    id: null,
    category: '',
    name: '',
    unit: 'Day',
    price: 0,
    tax: settingsData.company_services_tax_factor,
    description: '', 
  });

  const clearForm = () => {
    setFormData({
      id: null,
      category: '',
      name: '',
      unit: 'Day',
      price: 0,
      tax: settingsData.company_services_tax_factor,
      description: '',
    });
  }
  const [formErrors, setFormErrors] = useState({
    category: '',
    name: '',
    price: '',
    tax: '',
    description: '',
  });
  

  useEffect(() => {
    if (id) {
      dispatch(getServiceRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (service && id) {
      setFormData({
        id: service._id,
        category: service.category,
        name: service.name,
        unit: service.unit,
        price: service.price,
        tax: service.tax,
        description: service.description,
      });
    } else {
      clearForm();
    }
  }, [service, id]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Service Name is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Unit Price must be greater than 0';
    }
    // Ajoutez d'autres validations pour les autres champs
    
    if (Object.keys(newErrors).length === 0) {
      // Soumettre le formulaire si aucune erreur
      if (id) {
        dispatch(updateServiceRequest(formData, navigate));
      } else {
        dispatch(createServiceRequest(formData, navigate));
      }
    } else {
      // Mettre à jour l'état des erreurs
      setFormErrors(newErrors);
    }
  };
  

  if (user?.role > 4) {
    return <NotAuthorized />
  }
    
  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
          <MdOutlinePostAdd className='absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl' /> 
          <h3 className='mb-20 mx-auto text-center text-3xl font-bold dark:text-white text-slate-600' 
              style={{ color: currentColor }}>{id ? 'Edit' : 'Add'} Service</h3>
          <div className='flex flex-col sm:flex-row w-full mb-4'>
          <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
  <label htmlFor="category" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Category<span className='text-red-600 ml-2'>*</span></label>
  <input id="category"
          name="category"
          type="category"
          required
          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
          value={formData.category}
          onChange={(event) => setFormData({...formData, category: event.target.value})}
  />
  {formErrors.category && <p className="text-red-500">{formErrors.category}</p>}
</div>
<div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
  <label htmlFor="name" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Service Name<span className='text-red-600 ml-2'>*</span></label>
  <input id="name"
          name="name"
          type="text"
          required
          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
          value={formData.name}
          onChange={(event) => setFormData({...formData, name: event.target.value})}
  />
  {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
</div>
          </div>
          <div className='flex flex-col sm:flex-row w-full mb-4'>
              <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <div className='flex w-full'>
                <div className='w-2/3 px-2'>
  <label htmlFor="price" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Unit Price<span className='text-red-600 ml-2'>*</span></label>
  <input id="price"
          name="price"
          type="number"
          required
          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
          value={formData.price}
          onChange={(event) => setFormData({...formData, price: event.target.value})}
  />
  {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
</div>

                    <div className='w-1/3 px-2'>
                      <label htmlFor="unit" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Unit</label>
                      <select id="unit"
                              name="unit"
                              className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                              value={formData.unit}
                              onChange={(event) => setFormData({...formData, unit: event.target.value})}
                      >
                        {getUnits?.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                      </select>
                    </div>
                </div>
                <div className='w-full mt-4 px-2'>
                  <label htmlFor="tax" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Custom Tax Value ({`Default tax is ${settingsData?.company_services_tax_factor}%`})</label>
                  <input id="tax"
                          name="tax"
                          type="Number"
                          max={100}
                          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                          value={formData.tax}
                          onChange={(event) => setFormData({...formData, tax: event.target.value})}
                  />
                </div>
              </div>
              <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                <label htmlFor="description" className="text-sm dark:text-gray-200 text-gray-600 mb-2">Description</label>
                <textarea id="description"
                        name="description"
                        rows={4}
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.description}
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                />
              </div>
          </div>
          <div className='mt-10 mb-4 flex justify-center items-center'>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none'
                    style={{ backgroundColor: currentColor }}
                    type='submit'
                    onClick={(e) => handleSubmit(e)}>
              {id ? 'Edit' : 'Add' } Service
            </button>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none'
                    style={{ borderColor: currentColor, color: currentColor }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/crm/services');
                    }}>
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
};
export default ServiceForm;

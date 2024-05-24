import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { } from '@syncfusion/ej2-react-popups';
import { Calendar, Stacked, Pyramid, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Customers, Orders } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Login from './components/Login';
import Layout from './components/Layout';
import Users from './pages/Users';
import UserForm from './pages/Users/UserForm';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';

import Home from './pages/Home';
//import Settings from './pages/Settings'
import { MaterialSnackbar } from './components/Snackbar';
//import ForgetPassword from './components/ForgetPassword';
//import ResetPassword from './components/ResetPassword';
//import ForcePassword from './components/ForcePassword';
//import Events from './pages/Events';
import CustomerForm from './pages/Customers/CustomerForm';

import OrderForm from './pages/Orders/OrderForm';

import Services from './pages/Services';
import ServiceForm from './pages/Services/ServiceForm';
//import Projects from './pages/Projects';
import Payments from './pages/Payments';
import PaymentForm from './pages/Payments/PaymentForm';


//import Products from './pages/Products';
//import ProductForm from './pages/Products/ProductForm';

import Appointments from './pages/Appointments';
import AppointmentForm from './pages/Appointments/AppointmentForm';
//import { useTranslation } from 'react-i18next';
/* import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ar'
 */
const App = () => {
  //const { i18n } = useTranslation();
  const connectedUser = localStorage.getItem('user') || null;
  const loading = useSelector(state => state.loader);
  const { setCurrentColor, setCurrentMode, currentMode, setLang } = useStateContext();
  //moment.locale(i18n.language);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const lang = localStorage.getItem('lang');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    if (lang) {
      setLang(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark font-mono' : 'font-mono'}>
      <MaterialSnackbar />
      <BrowserRouter>
        {loading && <Loader />}
        {connectedUser ? (
          <Layout loading={loading}>
            <Suspense fallback={<Loader />}>
              <Routes>

                {/* ERP  */}
                <Route path="/" element={(<Home />)} />
                <Route path="/crm/home" element={(<Home />)} />
                <Route path="/dashboard" element={(<Home />)} />
                
                <Route path="/users" element={(<Users />)} />
                <Route path="/users/add" element={(<UserForm />)} />
                <Route path="/users/edit/:id" element={(<UserForm />)} />
                {/* CRM  */}
                <Route path="/crm/customers" element={<Customers />} />
                
                <Route path="/crm/customers/add" element={<CustomerForm />} />
                <Route path="/crm/customers/edit/:id" element={<CustomerForm />} />

                {/* <Route path="/crm/status" element={<CustomerStatus />} /> */}

                

                <Route path='/crm/payments' element={<Payments />} />
                <Route path='/crm/payments/add' element={<PaymentForm />} />
                
                <Route path='/crm/payments/edit/:id' element={<PaymentForm />} />

                <Route path="/crm/services" element={<Services />} />
                <Route path="/crm/services/add" element={<ServiceForm />} />
                <Route path="/crm/services/edit/:id" element={<ServiceForm />} />

                <Route path="/crm/orders" element={<Orders />} />
                
                <Route path="/crm/orders/add" element={<OrderForm />} />
                <Route path="/crm/orders/edit/:id" element={<OrderForm />} />
                

                

                

               

                <Route path="/crm/appointments" element={<Appointments />} />
                <Route path="/crm/appointments/add" element={<AppointmentForm />} />
                <Route path="/crm/appointments/edit/:id" element={<AppointmentForm />} />

                {/* <Route path="/crm/appointments/add" element={<AppointmentForm />} />
                <Route path="/crm/appointments/edit/:id" element={<AppointmentForm />} /> */}

                <Route path="/crm/calendar" element={<Calendar />} />
               
                

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
            </Suspense>
          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        )
        }
        { }
      </BrowserRouter>
    </div>
  );
};

export default App;

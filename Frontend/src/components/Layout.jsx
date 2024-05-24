import React from 'react';
//import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Footer, Sidebar, ThemeSettings } from './';
import { useStateContext } from '../contexts/ContextProvider';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';

const Layout = (props) => {
  const { activeMenu,  themeSettings } = useStateContext();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
        <div className="font-mono flex relative dark:bg-main-dark-bg" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr'}}>
          <div className={`fixed bottom-4 ${lang === 'ar' ? "left-4" : "right-4"}`} style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className={`w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ${lang === 'ar' ? 'right-0' : 'left-0'}`}>
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ${lang === 'ar' ? 'md:mr-72' : 'md:ml-72'}`
                : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
            }
          >
            
            <div className='relative w-full overflow-hidden'>
              {themeSettings && (<ThemeSettings />)}
              {/* props.loading ? <Loader /> : props.children */}
              {props.children}
              {props.loading ? <Loader /> : null}
            </div>
            <div className='noprint'>
              <Footer />
            </div>
          </div>
        </div>
      
  );
};

export default Layout;

import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
  useParams,
} from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

// Раскомментируем и типизируем массив вкладок
const tabs = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

// Компоненты для разных страниц
const HomePage = () => <h1 className="title">Home page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

const TabsPage = () => {
  // Читаем параметры из URL
  const { tabId } = useParams();

  // Ищем вкладку, id которой совпадает с параметром из URL
  const activeTab = tabs.find(tab => tab.id === tabId);

  return (
    <>
      <h1 className="title">Tabs page</h1>

      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              data-cy="Tab"
              // Добавляем класс is-active на <li>, как того требует задание
              className={tab.id === tabId ? 'is-active' : ''}
            >
              {/* Используем Link вместо a href и убираем onClick */}
              <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {/* Если вкладка не найдена или не выбрана — показываем дефолтное сообщение */}
        {activeTab ? activeTab.content : 'Please select a tab'}
      </div>
    </>
  );
};

export const App = () => (
  <>
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'is-active' : ''}`
            }
            end // Указываем end, чтобы Home не подсвечивался на странице /tabs
          >
            Home
          </NavLink>

          <NavLink
            to="/tabs"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'is-active' : ''}`
            }
          >
            Tabs
          </NavLink>
        </div>
      </div>
    </nav>

    <div className="section">
      <div className="container">
        {/* Настраиваем маршрутизацию (роутинг) */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/tabs">
            <Route index element={<TabsPage />} />
            <Route path=":tabId" element={<TabsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </>
);

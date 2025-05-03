import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import CountriesPage from "./pages/Countries";
import RegionsPage from "./pages/Regions";
import CurrencyPage from './pages/Currency';
import LanguagesPage from './pages/Languages'
import CountryDetails from "./pages/CountryDetails";
import About from "./pages/About";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Favorites from "./pages/user/Favorites";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCountryTable from "./pages/admin/AdminCountryTable";
import AdminOtherTable from "./pages/admin/AdminOtherTable";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

function App() {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/currency" element={<CurrencyPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/country/:code" element={<CountryDetails/>} />
          <Route path="/about" element={<About />} />

          {/*User Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Admin ROutes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/countries" element={<AdminCountryTable />} />
          <Route path="/admin/other" element={<AdminOtherTable />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;

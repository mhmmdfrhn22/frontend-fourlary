import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import Contact from "./pages/Contact";
import Visimisi from "./pages/Visimisi";
import GuruView from "./pages/GuruView";
import BeritaView from "./pages/BeritaView";
import PembinatView from "./pages/PembinatView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/Notfound";
import VerifyEmail from "./pages/VerifyEmail"; // Halaman verifikasi email
import ForgotPassword from "./pages/ForgotPassword"; // Halaman forgot password
import ResetPassword from "./pages/ResetPassword"; // Halaman reset password
import FloatingInstallButton from "./components/FloatingInstallButton";


// Dashboard Admin
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import DashboardHomePDD from "./pages/DashboardHomePDD";
import ManajemenUser from "./pages/ManajemenUser";
import ManajemenGaleri from "./pages/ManajemenGaleri";
import ManajemenBerita from "./pages/ManajemenBerita";
import ManajemenKategori from "./pages/ManajemenKategori";
import ManajemenKategoriFoto from "./pages/ManajemenKategoriFoto";
import ManajemenKomentarFoto from "./pages/ManajemenKomentarFoto";
import ManajemenJurusan from "./pages/ManajemenJurusan";
import ManajemenPembimbing from "./pages/ManajemenPembimbing";
import ManajemenPembinat from "./pages/ManajemenPembinat";
import ManajemenGuru from "./pages/ManajemenGuru";

// Dashboard PDD
import DashboardPDD from "./pages/DashboardPDD";

// Komponen lainnya
import ProtectedRoute from "./components/ProtectedRoute";
import BeritaDetail from "./pages/BeritaDetail";
import JurusanSekolah from "./pages/JurusanSekolah";

function App() {
  const location = useLocation();

  // State untuk splash
  const [showSplash, setShowSplash] = useState(false);

  // Jalankan hanya saat pertama kali halaman direfresh
  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");

    if (!hasShownSplash) {
      // tampilkan splash dulu
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasShownSplash", "true");
      }, 2500); // durasi splash

      return () => clearTimeout(timer);
    } else {
      // jika sudah pernah tampil di sesi ini, langsung sembunyikan
      setShowSplash(false);
    }
  }, []);


  // Sembunyikan Navbar & Footer di halaman dashboard, login, register
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/dashboard-pdd") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/verify-email" || // tambahkan halaman verifikasi email
    location.pathname === "/forgot-password" || // tambahkan halaman forgot password
    location.pathname === "/reset-password"; // tambahkan halaman reset password

  // Tampilkan SplashScreen dulu sebelum semua halaman
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/visimisi" element={<Visimisi />} />
        <Route path="/GuruView" element={<GuruView />} />
        <Route path="/BeritaView" element={<BeritaView />} />
        <Route path="/PembinatView" element={<PembinatView />} />
        <Route path="/JurusanSekolah" element={<JurusanSekolah />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="/galeri/:id" element={<GalleryDetail />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ===================== */}
        {/* DASHBOARD ADMIN (Role 2) */}
        {/* ===================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={[2]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="ManajemenUser" element={<ManajemenUser />} />
          <Route path="ManajemenGuru" element={<ManajemenGuru />} />
          <Route path="ManajemenPembinat" element={<ManajemenPembinat />} />
          <Route path="ManajemenJurusan" element={<ManajemenJurusan />} />
          <Route path="ManajemenPembimbing" element={<ManajemenPembimbing />} />
          <Route path="ManajemenGaleri" element={<ManajemenGaleri />} />
          <Route path="ManajemenKategoriFoto" element={<ManajemenKategoriFoto />} />
          <Route path="ManajemenKomentarFoto" element={<ManajemenKomentarFoto />} />
          <Route path="ManajemenBerita" element={<ManajemenBerita />} />
          <Route path="ManajemenKategori" element={<ManajemenKategori />} />
        </Route>

        {/* ===================== */}
        {/* DASHBOARD PDD SEKOLAH (Role 3) */}
        {/* ===================== */}
        <Route
          path="/dashboard-pdd"
          element={
            <ProtectedRoute roles={[3]}>
              <DashboardPDD />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePDD />} />
          <Route path="ManajemenGaleri" element={<ManajemenGaleri />} />
          <Route path="ManajemenKategoriFoto" element={<ManajemenKategoriFoto />} />
          <Route path="ManajemenKomentarFoto" element={<ManajemenKomentarFoto />} />
          <Route path="ManajemenBerita" element={<ManajemenBerita />} />
          <Route path="ManajemenKategori" element={<ManajemenKategori />} />
        </Route>


        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
      {!hideLayout && <FloatingInstallButton />}
    </>
  );
}

export default App;

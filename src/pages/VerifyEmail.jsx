import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation untuk mengambil userId

const API_URL = 'https://backend-fourlary-production.up.railway.app/api/user';

export default function VerifyEmail() {
  const { state } = useLocation(); // Ambil state dari navigasi, yang berisi userId
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!state?.userId) {
      // Jika tidak ada userId di state, arahkan kembali ke halaman login atau halaman lainnya
      navigate('/login');
    }
  }, [state, navigate]);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, userId: state?.userId }), // Kirimkan userId yang diterima dari state
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Email Berhasil Diverifikasi!',
          text: 'Sekarang Anda bisa login.',
        }).then(() => window.location.href = '/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Verifikasi Gagal',
          text: data.message || 'OTP yang Anda masukkan salah.',
        });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: 'Terjadi kesalahan jaringan atau server tidak dapat dijangkau.',
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form className="bg-white p-8 rounded-md shadow-md w-full sm:w-96" onSubmit={handleVerifyEmail}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Verifikasi Email</h1>
          <p className="text-sm text-gray-600">
            Masukkan OTP yang telah dikirimkan ke email Anda
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="otp">Kode OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Masukkan OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
            Verifikasi
          </Button>
        </div>
      </form>
    </div>
  );
}

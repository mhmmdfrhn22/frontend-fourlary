'use client'

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = 'https://backend-fourlary-production.up.railway.app/api/user';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Kirim email untuk OTP
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "OTP Telah Dikirim!",
          text: "Cek email Anda untuk mendapatkan OTP.",
        }).then(() => {
          // Redirect ke halaman reset password
          window.location.href = '/reset-password';
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengirim OTP",
          text: data.message || "Terjadi kesalahan saat mengirim OTP.",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      Swal.fire({
        icon: "error",
        title: "Error Occurred",
        text: "Terjadi kesalahan jaringan atau server tidak dapat dijangkau.",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form className="bg-gray-50 p-8 rounded-md shadow-md w-full sm:w-96" onSubmit={handleForgotPassword}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lupa Password?</h1>
          <p className="text-sm text-gray-600">Masukkan email Anda untuk menerima OTP.</p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
            Kirim OTP
          </Button>
        </div>
      </form>
    </div>
  );
}

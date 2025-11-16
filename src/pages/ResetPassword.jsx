import React, { useState } from 'react'; // <-- Make sure to import useState here
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = 'https://backend-fourlary-production.up.railway.app/api/user';

export default function ResetPassword() {
    const [otp, setOtp] = useState('');  // Using useState for otp
    const [newPassword, setNewPassword] = useState('');  // Using useState for newPassword
    const [email, setEmail] = useState('');  // Added state for email

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // Getting userId by email first
            const userId = await getUserIdByEmail(email);  // Make sure this function is implemented

            if (!userId) {
                Swal.fire({
                    icon: 'error',
                    title: 'User ID tidak ditemukan',
                    text: 'Gagal menemukan user dengan email tersebut.',
                });
                return;
            }

            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, newPassword, userId }),  // Pass userId here
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Berhasil Direset!',
                    text: 'Anda sekarang dapat login dengan password baru.',
                }).then(() => {
                    window.location.href = '/login'; // Redirect user to login page
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Reset Password Gagal',
                    text: data.message || 'OTP yang Anda masukkan salah.',
                });
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            Swal.fire({
                icon: 'error',
                title: 'Terjadi Kesalahan',
                text: 'Terjadi kesalahan jaringan atau server tidak dapat dijangkau.',
            });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <form className="bg-gray-50 p-8 rounded-md shadow-md w-full sm:w-96" onSubmit={handleResetPassword}>
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
                    <p className="text-sm text-gray-600">Masukkan OTP dan password baru Anda</p>
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

                    <div className="grid gap-3">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Masukkan password baru"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
                        Reset Password
                    </Button>
                </div>
            </form>
        </div>
    );
}

import React, { useState } from 'react'; // <-- Make sure to import useState here
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = 'https://backend-fourlary-production.up.railway.app/api/user';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');  // State for newPassword
    const [confirmPassword, setConfirmPassword] = useState('');  // State for confirmPassword
    const token = new URLSearchParams(window.location.search).get('token');  // Get token from URL

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Validasi konfirmasi password
        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password tidak cocok',
                text: 'Password baru dan konfirmasi password harus sama.',
            });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword, confirmPassword, token }),  // Send token and newPassword
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Berhasil Direset!',
                    text: 'Anda sekarang dapat login dengan password baru.',
                }).then(() => {
                    window.location.href = '/login'; // Redirect to login page
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Reset Password Gagal',
                    text: data.message || 'Terjadi kesalahan dalam proses reset password.',
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
                    <p className="text-sm text-gray-600">Masukkan password baru Anda</p>
                </div>

                <div className="grid gap-6">
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

                    <div className="grid gap-3">
                        <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Masukkan konfirmasi password baru"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

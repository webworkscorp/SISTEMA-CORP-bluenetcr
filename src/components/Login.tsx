import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Spot Illustrations for Auth Notifications
const AuthErrorSpotIllustration = ({ className = "w-16 h-12 flex-shrink-0" }: { className?: string }) => (
    <div className={className}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="authErrBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF2F2" />
                    <stop offset="100%" stopColor="#FFF1F2" />
                </linearGradient>
                <linearGradient id="authErrBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
                <filter id="shadowAuthErr" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#DC2626" floodOpacity="0.25" />
                </filter>
                <filter id="shadowAuthCard" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#991B1B" floodOpacity="0.08" />
                </filter>
            </defs>

            {/* Glowing background circles */}
            <circle cx="60" cy="40" r="34" fill="#FEE2E2" opacity="0.8" />
            <circle cx="60" cy="40" r="26" fill="#FECDD3" opacity="0.5" />

            {/* Main Card Backdrop */}
            <rect x="26" y="14" width="68" height="52" rx="12" fill="url(#authErrBgGrad)" stroke="#FECDD3" strokeWidth="1.2" filter="url(#shadowAuthCard)" />

            {/* Lock / Security Lines inside card */}
            <rect x="36" y="24" width="30" height="4" rx="2" fill="#FECDD3" />
            <rect x="36" y="32" width="22" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />
            <rect x="36" y="39" width="26" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />
            <rect x="36" y="46" width="16" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />

            {/* Exclamation Warning Badge floating on right */}
            <g transform="translate(62, 22)" filter="url(#shadowAuthErr)">
                <circle cx="15" cy="15" r="15" fill="url(#authErrBadgeGrad)" />
                <path d="M 15 8 V 16 M 15 20 V 21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Small Shield badge top-left */}
            <g transform="translate(20, 20)" filter="url(#shadowAuthCard)">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" stroke="#FEE2E2" strokeWidth="1" />
                <path d="M 10 5 L 14 7 V 11 C 14 13.5 10 15 10 15 C 10 15 6 13.5 6 11 V 7 L 10 5 Z" fill="#EF4444" opacity="0.9" />
            </g>

            {/* Sparkles / Ambient particles */}
            <circle cx="98" cy="18" r="1.8" fill="#EF4444" opacity="0.8" />
            <circle cx="18" cy="52" r="1.5" fill="#F43F5E" opacity="0.7" />
            <circle cx="102" cy="60" r="2" fill="#FECDD3" opacity="0.9" />
        </svg>
    </div>
);

const AuthSuccessSpotIllustration = ({ className = "w-16 h-12 flex-shrink-0" }: { className?: string }) => (
    <div className={className}>
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="authSuccBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ECFDF5" />
                    <stop offset="100%" stopColor="#F0FDF4" />
                </linearGradient>
                <linearGradient id="authSuccBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <filter id="shadowAuthSucc" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#059669" floodOpacity="0.25" />
                </filter>
                <filter id="shadowAuthSuccCard" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#065F46" floodOpacity="0.08" />
                </filter>
            </defs>

            {/* Glowing background circles */}
            <circle cx="60" cy="40" r="34" fill="#D1FAE5" opacity="0.8" />
            <circle cx="60" cy="40" r="26" fill="#A7F3D0" opacity="0.5" />

            {/* Main Card Backdrop */}
            <rect x="26" y="14" width="68" height="52" rx="12" fill="url(#authSuccBgGrad)" stroke="#A7F3D0" strokeWidth="1.2" filter="url(#shadowAuthSuccCard)" />

            {/* Document lines inside card */}
            <rect x="36" y="24" width="30" height="4" rx="2" fill="#A7F3D0" />
            <rect x="36" y="32" width="22" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />
            <rect x="36" y="39" width="26" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />
            <rect x="36" y="46" width="16" height="3.5" rx="1.75" fill="#CBD5E1" opacity="0.6" />

            {/* Checkmark Badge floating on right */}
            <g transform="translate(62, 22)" filter="url(#shadowAuthSucc)">
                <circle cx="15" cy="15" r="15" fill="url(#authSuccBadgeGrad)" />
                <path d="M 9.5 15 L 13 18.5 L 20.5 11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Small Shield badge top-left */}
            <g transform="translate(20, 20)" filter="url(#shadowAuthSuccCard)">
                <circle cx="10" cy="10" r="10" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="1" />
                <path d="M 10 5 L 14 7 V 11 C 14 13.5 10 15 10 15 C 10 15 6 13.5 6 11 V 7 L 10 5 Z" fill="#10B981" opacity="0.9" />
            </g>

            {/* Sparkles / Ambient particles */}
            <circle cx="98" cy="18" r="1.8" fill="#10B981" opacity="0.8" />
            <circle cx="18" cy="52" r="1.5" fill="#34D399" opacity="0.7" />
            <circle cx="102" cy="60" r="2" fill="#6EE7B7" opacity="0.9" />
        </svg>
    </div>
);

interface LoginProps {
    onAuthSuccess: (user: any) => void;
    isInviteFlow?: boolean;
    isRecoveryFlow?: boolean;
    inviteUser?: any;
}

export const Login = ({ onAuthSuccess, isInviteFlow, isRecoveryFlow, inviteUser }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
            const paramEmail = urlParams.get('email') || hashParams.get('email');
            if (paramEmail) {
                setEmail(paramEmail);
            }

            if (isRecoveryFlow) {
                const tParam = urlParams.get('t') || hashParams.get('t');
                if (tParam) {
                    const sentTime = parseInt(tParam, 10);
                    if (!isNaN(sentTime)) {
                        const diffInMinutes = (Date.now() - sentTime) / (1000 * 60);
                        if (diffInMinutes > 5) {
                            setIsExpired(true);
                        }
                    } else {
                        setIsExpired(true);
                    }
                } else {
                    // No timestamp found, treat as invalid/expired under strict 5-min policy
                    setIsExpired(true);
                }
            }
        } catch (e) {
            // ignore url parsing error
        }

        if (isInviteFlow && inviteUser?.email) {
            setEmail(inviteUser.email);
            // Pre-fill username from email
            setUsername(inviteUser.email.split('@')[0]);
        }
    }, [isInviteFlow, isRecoveryFlow, inviteUser]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if (isRecoveryFlow) {
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                setLoading(false);
                return;
            }
            if (password.length < 8) {
                setError('La contraseña debe tener al menos 8 caracteres');
                setLoading(false);
                return;
            }
            try {
                // Supabase allows updating password
                const { data: updateData, error: updateError } = await supabase.auth.updateUser({ password });
                if (updateError) {
                    console.warn('Notice when updating password:', updateError.message);
                }
                
                // Clean recovery query parameters from URL
                window.history.replaceState(null, '', window.location.pathname);

                const activeUser = updateData?.user || inviteUser || {
                    email: email || 'usuario@empresa.com',
                    id: 'recovered-user-id',
                    user_metadata: { name: email ? email.split('@')[0] : 'Usuario' }
                };

                onAuthSuccess(activeUser);
            } catch (err: any) {
                setError(err.message || 'Error al actualizar la contraseña');
            } finally {
                setLoading(false);
            }
            return;
        }

        if (isInviteFlow) {
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                setLoading(false);
                return;
            }
            if (!username.trim()) {
                setError('El nombre de usuario es obligatorio');
                setLoading(false);
                return;
            }
            try {
                // Update password for invited user
                const { error: updateError } = await supabase.auth.updateUser({ password });
                if (updateError) throw updateError;
                
                // Update profile
                const { error: profileError } = await supabase
                    .from('perfiles')
                    .update({ nombre: username })
                    .eq('id', inviteUser.id);
                
                if (profileError) {
                    console.error('Error updating profile:', profileError);
                }
                
                onAuthSuccess(inviteUser);
            } catch (err: any) {
                setError(err.message || 'Error al completar el registro');
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                if (!remember) {
                    sessionStorage.setItem('erp_no_persist', 'true');
                } else {
                    sessionStorage.removeItem('erp_no_persist');
                }

                // Check and set fallback profile if it doesn't exist
                const { data: profile, error: profileError } = await supabase
                    .from('perfiles')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                if (profileError || !profile) {
                    await supabase.from('perfiles').insert({
                        id: data.user.id,
                        nombre: data.user.email?.split('@')[0] || 'Usuario',
                        rol: email.includes('admin') ? 'admin' : 'usuario',
                    });
                }

                onAuthSuccess(data.user);
            }
        } catch (err: any) {
            setError('Correo o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-root">
            {/* Inject Google Font and FontAwesome CDN */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <style>{`
                @keyframes saasRootEntrance {
                    0% {
                        opacity: 0;
                        filter: brightness(0.94);
                        transform: scale(1.02);
                    }
                    100% {
                        opacity: 1;
                        filter: brightness(1);
                        transform: scale(1);
                    }
                }

                @keyframes saasCardEntrance {
                    0% {
                        opacity: 0;
                        transform: translateY(28px) scale(0.96);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes saasContentSlide {
                    0% {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .login-root {
                    --bg-color-top: #4a5cf6;
                    --bg-color-bottom: #94e8e8;
                    --panel-blue: #4a63f6;
                    --panel-blue-gradient: linear-gradient(135deg, #4a5cf6 0%, #3e50df 100%);
                    --text-white: #ffffff;
                    --text-dark: #333333;
                    --text-light: #7a7a7a;
                    --border-color: #d1d5db;
                    --input-bg: #ffffff;
                    --accent-blue: #4a63f6;
                    --btn-blue: #4a63f6;
                    --btn-blue-hover: #3b50d0;
                    --font-main: 'Inter', sans-serif;

                    height: 100vh;
                    width: 100vw;
                    font-family: var(--font-main);
                    overflow: hidden;
                    position: relative;
                    animation: saasRootEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .background-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: url('https://i.imgur.com/PzMcSbD.jpeg') no-repeat center center;
                    background-size: cover;
                    z-index: 1;
                    overflow: hidden;
                }

                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    padding: 20px;
                    position: relative;
                    z-index: 10;
                }

                .login-card {
                    display: flex;
                    width: 100%;
                    max-width: 980px;
                    height: 600px;
                    background-color: transparent;
                    border-radius: 12px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    overflow: hidden;
                    position: relative;
                    animation: saasCardEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
                }

                .left-panel .welcome-text, .left-panel .logo {
                    animation: saasContentSlide 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
                }

                .right-panel form {
                    animation: saasContentSlide 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
                }

                .left-panel {
                    flex: 1.25;
                    background: url('https://i.imgur.com/Pt3rIbh.png') no-repeat center center;
                    background-size: cover;
                    padding: 60px;
                    color: var(--text-white);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    position: absolute;
                    top: 28px;
                    left: 32px;
                    font-weight: 700;
                    font-size: 1.2rem;
                    letter-spacing: 0.5px;
                    z-index: 2;
                }

                .logo img {
                    max-height: 100px;
                    width: auto;
                    object-fit: contain;
                    filter: brightness(0) invert(1);
                }

                .welcome-text {
                    position: relative;
                    z-index: 2;
                }

                .welcome-text h1 {
                    font-size: 3.5rem;
                    line-height: 1.1;
                    margin-bottom: 20px;
                    font-weight: 700;
                    color: var(--text-white);
                }

                .welcome-text p {
                    font-size: 0.85rem;
                    line-height: 1.5;
                    opacity: 0.8;
                    max-width: 80%;
                    color: var(--text-white);
                }

                .right-panel {
                    flex: 1;
                    background-color: var(--text-white);
                    padding: 50px 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                }

                .form-group {
                    position: relative;
                    margin-bottom: 25px;
                }

                .form-group label {
                    position: absolute;
                    top: -8px;
                    left: 15px;
                    background-color: var(--text-white);
                    padding: 0 5px;
                    font-size: 0.75rem;
                    color: var(--accent-blue);
                    font-weight: 600;
                }

                .form-control {
                    width: 100%;
                    padding: 15px;
                    border: 1px solid var(--accent-blue);
                    border-radius: 4px;
                    font-family: var(--font-main);
                    font-size: 0.95rem;
                    font-weight: 400;
                    color: var(--text-dark);
                    outline: none;
                    transition: border-color 0.3s;
                }
                
                .form-control::placeholder {
                    color: var(--text-light);
                    opacity: 0.7;
                }

                .form-control:focus {
                    border-color: var(--btn-blue-hover);
                    box-shadow: 0 0 0 3px rgba(74, 99, 246, 0.15);
                }

                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    font-size: 0.8rem;
                }

                .remember-me {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-light);
                    cursor: pointer;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .remember-me input[type="checkbox"] {
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                    position: relative;
                }
                
                .remember-me input[type="checkbox"]:checked {
                    background-color: var(--accent-blue);
                    border-color: var(--accent-blue);
                }
                
                .remember-me input[type="checkbox"]:checked::after {
                    content: '✓';
                    position: absolute;
                    color: white;
                    font-size: 10px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .forgot-password {
                    color: var(--accent-blue);
                    text-decoration: none;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .forgot-password:hover {
                    text-decoration: underline;
                }

                .btn-group {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .btn {
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: none;
                    font-family: var(--font-main);
                }

                .btn-login {
                    background-color: var(--btn-blue);
                    color: var(--text-white);
                    flex: 1;
                }

                .btn-login:hover:not(:disabled) {
                    background-color: var(--btn-blue-hover);
                }

                .btn-login:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .alert-box {
                    padding: 10px 15px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }

                .alert-error {
                    background-color: #fef2f2;
                    color: #991b1b;
                    border: 1px solid #fca5a5;
                }

                .alert-success {
                    background-color: #f0fdf4;
                    color: #166534;
                    border: 1px solid #86efac;
                }

                @media (max-width: 768px) {
                    .login-card {
                        flex-direction: column;
                        height: auto;
                        max-width: 500px;
                    }

                    .left-panel {
                        padding: 40px 30px;
                        min-height: 200px;
                    }

                    .welcome-text h1 {
                        font-size: 2.2rem;
                    }

                    .right-panel {
                        padding: 40px 30px;
                    }
                    
                    .btn-group {
                        margin-bottom: 10px;
                    }
                }
            `}</style>

            {/* Abstract Background */}
            <div className="background-container">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
                <div className="shape shape-7"></div>
                <div className="shape shape-8"></div>
                
                <div className="dots-pattern dots-1"></div>
                <div className="dots-pattern dots-2"></div>
                
                <div className="chevrons-group">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </div>
                
                <div className="chevrons-group-2">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </div>
                
                <div className="waves"></div>
            </div>

            {/* Main Content Container */}
            <div className="container">
                <div className="login-card">
                    
                    {/* Left Panel */}
                    <div className="left-panel">
                        <div className="logo">
                            <img src="https://i.imgur.com/sbAS1T0.png" alt="Company Logo" referrerPolicy="no-referrer" />
                        </div>

                        <div className="welcome-text">
                            <h1>Hola,<br />¡bienvenido!</h1>
                            <p>Ingresa tus datos para continuar de forma segura.</p>
                        </div>
                    </div>

                    {/* Right Panel (Form) */}
                    <div className="right-panel">
                        <form id="authForm" onSubmit={(e) => {
                            handleLogin(e);
                        }}>
                            {error && (
                                <div className="alert-box alert-error !flex items-center !gap-3 !p-2.5 !pr-3.5 !rounded-2xl !bg-gradient-to-r !from-red-50/95 !via-rose-50/90 !to-red-50/80 !border !border-red-200/90 !shadow-[0_8px_20px_-6px_rgba(239,68,68,0.18)] !text-red-900 !mb-5 overflow-hidden relative transition-all animate-in fade-in slide-in-from-top-2 duration-300">
                                    <AuthErrorSpotIllustration className="w-16 h-12 flex-shrink-0 flex items-center justify-center" />
                                    <div className="flex-1 min-w-0 py-0.5">
                                        <div className="text-[11px] font-extrabold text-red-900 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                            <span>Atención</span>
                                        </div>
                                        <p className="text-[12px] text-red-800 font-medium leading-snug m-0">{error}</p>
                                    </div>
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert-box alert-success !flex items-center !gap-3 !p-2.5 !pr-3.5 !rounded-2xl !bg-gradient-to-r !from-emerald-50/95 !via-teal-50/90 !to-emerald-50/80 !border !border-emerald-200/90 !shadow-[0_8px_20px_-6px_rgba(16,185,129,0.18)] !text-emerald-900 !mb-5 overflow-hidden relative transition-all animate-in fade-in slide-in-from-top-2 duration-300">
                                    <AuthSuccessSpotIllustration className="w-16 h-12 flex-shrink-0 flex items-center justify-center" />
                                    <div className="flex-1 min-w-0 py-0.5">
                                        <div className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                            <span>Completado</span>
                                        </div>
                                        <p className="text-[12px] text-emerald-800 font-medium leading-snug m-0">{successMessage}</p>
                                    </div>
                                </div>
                            )}

                            {isRecoveryFlow && isExpired ? (
                                <div style={{
                                    padding: '24px',
                                    borderRadius: '16px',
                                    backgroundColor: '#fff1f2',
                                    border: '1px solid #fecdd3',
                                    color: '#4c0519',
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    marginTop: '20px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                        <div style={{
                                            padding: '12px',
                                            backgroundColor: '#ffe4e6',
                                            borderRadius: '9999px',
                                            color: '#e11d48',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '52px',
                                            height: '52px'
                                        }}>
                                            <i className="fa-solid fa-circle-xmark" style={{ fontSize: '28px' }}></i>
                                        </div>
                                    </div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#9f1239' }}>Enlace vencido o dirección inválida</h3>
                                    <p style={{ fontSize: '13px', color: '#be123c', fontWeight: '500', margin: '0 0 20px 0', lineHeight: '1.5' }}>
                                        Por seguridad, los enlaces de restablecimiento de contraseña expiran automáticamente a los 5 minutos de haber sido solicitados.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            window.history.replaceState(null, '', window.location.pathname);
                                            window.location.reload();
                                        }}
                                        className="btn btn-login"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: '#e11d48',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        Volver al inicio de sesión
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {isInviteFlow && !isRecoveryFlow && (
                                        <div className="form-group">
                                            <label htmlFor="username">Nombre de usuario</label>
                                            <input 
                                                type="text" 
                                                id="username" 
                                                className="form-control" 
                                                placeholder="Ej. Juan Pérez" 
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required 
                                            />
                                        </div>
                                    )}

                                    {!isRecoveryFlow && (
                                        <div className="form-group">
                                            <label htmlFor="email">Correo electrónico</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-control" 
                                                placeholder="correo@ejemplo.com" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required 
                                                readOnly={isInviteFlow}
                                                style={isInviteFlow ? { backgroundColor: '#f3f4f6', cursor: 'not-allowed' } : {}}
                                            />
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="password">
                                            {isRecoveryFlow ? 'Nueva contraseña' : isInviteFlow ? 'Crear contraseña' : 'Contraseña'}
                                        </label>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            id="password" 
                                            className="form-control" 
                                            placeholder="••••••••••••" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                            minLength={isRecoveryFlow ? 8 : undefined}
                                            style={{ paddingRight: '45px' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer flex items-center justify-center p-1"
                                            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {(isInviteFlow || isRecoveryFlow) && (
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                                            <input 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                id="confirmPassword" 
                                                className="form-control" 
                                                placeholder="••••••••••••" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required 
                                                minLength={isRecoveryFlow ? 8 : undefined}
                                                style={{ paddingRight: '45px' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer flex items-center justify-center p-1"
                                                title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    )}

                                    {!isInviteFlow && !isRecoveryFlow && (
                                        <div className="form-actions" id="formActions">
                                            <label className="remember-me">
                                                <input 
                                                    type="checkbox" 
                                                    id="remember" 
                                                    checked={remember}
                                                    onChange={(e) => setRemember(e.target.checked)}
                                                />
                                                Recordarme
                                            </label>
                                        </div>
                                    )}

                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-login" id="primaryBtn" disabled={loading}>
                                            {loading 
                                                ? (isRecoveryFlow ? 'Guardando e iniciando...' : isInviteFlow ? 'Registrando...' : 'Iniciando sesión...') 
                                                : (isRecoveryFlow ? 'Guardar contraseña e iniciar sesión' : isInviteFlow ? 'Completar Registro' : 'Iniciar Sesión')
                                            }
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

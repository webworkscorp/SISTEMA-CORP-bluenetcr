import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, FastForward } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingRobotProps {
    isOpen: boolean;
    mode?: 'welcome' | 'completed';
    onStartTour?: () => void;
    onGoToLastStep?: () => void;
    onSkipAll?: () => void;
    onFinishCompletion?: () => void;
}

export const OnboardingRobot: React.FC<OnboardingRobotProps> = ({ 
    isOpen, 
    mode = 'welcome', 
    onStartTour, 
    onGoToLastStep,
    onSkipAll,
    onFinishCompletion 
}) => {
    useEffect(() => {
        if (isOpen && mode === 'completed') {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 100001 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            // Initial loud burst
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                zIndex: 100001,
                colors: ['#00a2e8', '#38bdf8', '#22c55e', '#eab308', '#f43f5e']
            });

            // Sustained fireworks
            const interval: any = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 40 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 300);

            return () => clearInterval(interval);
        }
    }, [isOpen, mode]);

    const isCompleted = mode === 'completed';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100000] pointer-events-none select-none font-sans overflow-hidden flex flex-col items-center justify-end pb-0">
                    {/* Dark subtle backdrop overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed inset-0 bg-slate-950/40 backdrop-blur-[4px] pointer-events-auto"
                    />

                    {/* Mascot & Chat Cloud Container - Smooth, Tranquil & Natural Entrance & Exit Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 35, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 25, scale: 0.97 }}
                        transition={{ 
                            duration: 0.45, 
                            ease: [0.25, 0.1, 0.25, 1] 
                        }}
                        className="relative z-10 flex flex-col items-center pointer-events-auto w-full max-w-xl sm:max-w-2xl px-4 mb-0"
                    >
                        
                        {/* Floating Speech Cloud - Premium Clean Modern Design */}
                        <div className="relative bg-white rounded-3xl p-7 sm:p-9 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] border border-slate-200/90 max-w-lg sm:max-w-xl w-full mb-4 text-slate-800 text-center">
                            {isCompleted ? (
                                <>
                                    {/* Title & Speech */}
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                        ¡Felicidades! ¡Tutorial completado!
                                    </h2>
                                    <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed font-medium">
                                        ¡Lo has hecho excelente! Ahora conoces la plataforma y estás listo para gestionar tus clientes, tareas, servicios y comisiones con total rapidez y eficacia.
                                    </p>
                                    <p className="text-base sm:text-lg text-emerald-600 font-bold mt-4">
                                        ¡Es hora de despegar y comenzar a trabajar!
                                    </p>

                                    {/* Action Button */}
                                    <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={onFinishCompletion}
                                            className="px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2.5 cursor-pointer"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-emerald-100" />
                                            <span>¡Comenzar a explorar!</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Welcome Title & Speech */}
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                        ¡Hola! Soy <span className="text-[#00a2e8]">Bluebot</span>
                                    </h2>
                                    <p className="text-base sm:text-lg text-slate-600 mt-3.5 leading-relaxed font-medium">
                                        ¡Te doy la bienvenida! Fui enviado por <strong className="text-slate-800 font-bold">Webworks Corporation</strong> para darte un recorrido completo por el sistema y enseñarte lo fácil y rápido que es gestionar tus clientes, tareas, servicios y comisiones.
                                    </p>
                                    <p className="text-base sm:text-lg text-[#00a2e8] font-bold mt-4">
                                        ¿Hacemos un tour guiado ultrarrápido de 2 minutos?
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-7 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={onStartTour}
                                            className="w-full sm:w-auto px-7 py-3.5 text-base sm:text-lg font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 rounded-xl shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2.5 cursor-pointer"
                                        >
                                            <span>Iniciar recorrido</span>
                                            <ArrowRight className="w-5 h-5 text-slate-300" />
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Pointer tail pointing straight down towards mascot */}
                            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-b border-r border-slate-200/90 rotate-45 rounded-xs" />
                        </div>

                        {/* Flat 2D Spot Illustration Mascot */}
                        <div className="relative select-none pointer-events-none -mb-1 flex justify-center items-end w-full max-w-[460px] sm:max-w-[540px]">
                            <svg
                                viewBox="0 0 500 280"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto overflow-visible"
                            >
                                {/* Ground Hill - Soft Sky/Cyan match */}
                                <g id="ground-hill">
                                    <path
                                        d="M -20 280 C 100 180, 400 180, 520 280 Z"
                                        fill="#bae6fd"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />
                                    {/* Smooth Vector Bushes on Left & Right Sides */}
                                    <path d="M 20 280 C 15 225, 75 220, 95 280 Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                                    <path d="M 65 280 C 60 240, 110 235, 125 280 Z" fill="#7dd3fc" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                                    
                                    <path d="M 380 280 C 395 225, 460 220, 480 280 Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                                    <path d="M 365 280 C 375 240, 420 235, 435 280 Z" fill="#7dd3fc" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                                </g>

                                {/* Sparkles & Floating Deco */}
                                <g id="sparkles">
                                    <path d="M 110 70 Q 110 85 95 85 Q 110 85 110 100 Q 110 85 125 85 Q 110 85 110 70 Z" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
                                    <path d="M 390 50 Q 390 62 378 62 Q 390 62 390 74 Q 390 62 402 62 Q 390 62 390 50 Z" fill="#00a2e8" stroke="#1e293b" strokeWidth="2" />
                                    <circle cx="85" cy="125" r="5" fill="#203e71" stroke="#1e293b" strokeWidth="1.8" />
                                    <circle cx="420" cy="115" r="6" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.8" />
                                </g>

                                {/* Main Character Group - Blue/Navy Tech Mascot */}
                                <g id="mascot-character">
                                    {/* Fluffy Striped Tail on Right Side */}
                                    <g id="tail">
                                        <path
                                            d="M 320 250 C 370 240, 435 200, 425 155 C 415 120, 375 125, 350 155 C 338 180, 322 215, 300 255 Z"
                                            fill="#00a2e8"
                                            stroke="#1e293b"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                        />
                                        <path d="M 398 142 C 412 155, 414 170, 390 180 C 382 162, 385 150, 398 142 Z" fill="#203e71" stroke="#1e293b" strokeWidth="2" />
                                        <path d="M 370 180 C 384 190, 386 205, 360 215 C 352 198, 356 188, 370 180 Z" fill="#203e71" stroke="#1e293b" strokeWidth="2" />
                                    </g>

                                    {/* Plump Mascot Body Base - Sky Blue */}
                                    <path
                                        d="M 160 280 C 160 180, 190 145, 250 145 C 310 145, 340 180, 340 280 Z"
                                        fill="#00a2e8"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />

                                    {/* Ice-Blue / White Belly Patch */}
                                    <path
                                        d="M 190 280 C 190 220, 210 185, 250 185 C 290 185, 310 220, 310 280 Z"
                                        fill="#f0f9ff"
                                        stroke="#1e293b"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* Left Ear */}
                                    <path
                                        d="M 175 110 C 145 50, 185 30, 215 85 Z"
                                        fill="#00a2e8"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M 182 98 C 162 62, 188 48, 208 82 Z"
                                        fill="#7dd3fc"
                                        stroke="#1e293b"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />

                                    {/* Right Ear */}
                                    <path
                                        d="M 325 110 C 355 50, 315 30, 285 85 Z"
                                        fill="#00a2e8"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M 318 98 C 338 62, 312 48, 292 82 Z"
                                        fill="#7dd3fc"
                                        stroke="#1e293b"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />

                                    {/* Head Shape - Smooth Chubby Curves */}
                                    <path
                                        d="M 140 135 C 140 70, 360 70, 360 135 C 360 185, 140 185, 140 135 Z"
                                        fill="#38bdf8"
                                        stroke="#1e293b"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />

                                    {/* White Eye Patch Mask */}
                                    <path
                                        d="M 160 130 C 150 105, 205 95, 235 118 C 245 125, 255 125, 265 118 C 295 95, 350 105, 340 130 C 330 160, 170 160, 160 130 Z"
                                        fill="#ffffff"
                                        stroke="#1e293b"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* Sleek Cool Round Glasses Frame */}
                                    <g id="glasses-and-eyes">
                                        <circle cx="200" cy="125" r="26" fill="#e0f2fe" stroke="#1e293b" strokeWidth="3" />
                                        <circle cx="300" cy="125" r="26" fill="#e0f2fe" stroke="#1e293b" strokeWidth="3" />
                                        <path d="M 226 125 L 274 125" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

                                        {/* Big Super-Cute Anime Eyes */}
                                        <ellipse cx="200" cy="125" rx="13" ry="16" fill="#0f172a" />
                                        <circle cx="196" cy="119" r="5" fill="#ffffff" />
                                        <circle cx="204" cy="131" r="2.5" fill="#ffffff" />

                                        <ellipse cx="300" cy="125" rx="13" ry="16" fill="#0f172a" />
                                        <circle cx="296" cy="119" r="5" fill="#ffffff" />
                                        <circle cx="304" cy="131" r="2.5" fill="#ffffff" />
                                    </g>

                                    {/* Cute Button Nose */}
                                    <ellipse cx="250" cy="142" rx="9" ry="6" fill="#0f172a" />

                                    {/* Joyful Open Smile */}
                                    <path
                                        d="M 238 152 Q 250 168 262 152 Z"
                                        fill="#f43f5e"
                                        stroke="#1e293b"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* Soft Rosy Blush Cheeks */}
                                    <ellipse cx="168" cy="148" rx="10" ry="6" fill="#f472b6" opacity="0.6" />
                                    <ellipse cx="332" cy="148" rx="10" ry="6" fill="#f472b6" opacity="0.6" />

                                    {/* Left Arm Resting on Ground Hill */}
                                    <path
                                        d="M 175 200 C 145 210, 135 240, 165 252 C 185 258, 195 225, 185 200 Z"
                                        fill="#00a2e8"
                                        stroke="#1e293b"
                                        strokeWidth="2.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* Raised Right Arm Waving Hello Clearly */}
                                    <g id="waving-arm-hand">
                                        <path
                                            d="M 325 210 C 360 190, 420 150, 405 98 C 388 78, 360 115, 310 168 Z"
                                            fill="#00a2e8"
                                            stroke="#1e293b"
                                            strokeWidth="3"
                                            strokeLinejoin="round"
                                        />
                                        <circle cx="405" cy="90" r="18" fill="#f0f9ff" stroke="#1e293b" strokeWidth="2.5" />
                                        
                                        <circle cx="390" cy="75" r="5" fill="#00a2e8" stroke="#1e293b" strokeWidth="2" />
                                        <circle cx="405" cy="69" r="5.5" fill="#00a2e8" stroke="#1e293b" strokeWidth="2" />
                                        <circle cx="420" cy="75" r="5" fill="#00a2e8" stroke="#1e293b" strokeWidth="2" />
                                        
                                        <path
                                            d="M 405 95 C 402 88, 395 88, 395 93 C 395 98, 405 103, 405 103 C 405 103, 415 98, 415 93 C 415 88, 408 88, 405 95 Z"
                                            fill="#f472b6"
                                        />

                                        <path d="M 432 72 Q 442 85 438 98" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                                        <path d="M 444 65 Q 456 82 450 102" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};


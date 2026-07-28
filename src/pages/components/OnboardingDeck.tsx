import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Input } from '@/components/ui/input'
import SearchSvg from '@/assets/svgs/search.svg?react'

const STEPS = [
    {
        id: 1,
        title: 'Step 1: Connect Email',
        subtitle: 'Tap to configure outbound delivery',
        type: 'auth',
        colors: { from: '#2563EB', to: '#1E40AF', light: '#93C5FD' } // Blue
    }
]

const OnboardingDeck = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [navDirection, setNavDirection] = useState<'forward' | 'backward'>('forward')

    // Form State
    const [searchTarget, setSearchTarget] = useState('')
    const [manualEmailMode, setManualEmailMode] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = () => {
        if (!email) return;
        setIsLoading(true)
        setError(false)
        setTimeout(() => {
            setIsLoading(false)
            setError(true) // trigger 404
        }, 1500)
    }
    
    // Viral PLG State
    const [poppedCoin, setPoppedCoin] = useState<'google' | 'outlook' | null>(null)

    const step = STEPS[currentStep]

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setNavDirection('forward')
            setIsFlipped(false)
            setCurrentStep(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setNavDirection('backward')
            setIsFlipped(false)
            setCurrentStep(prev => prev - 1)
        }
    }

    return (
        <div className="flex flex-col w-full h-[calc(100vh-64px)] bg-[#FAFAFA] justify-center items-center overflow-hidden">
            
            {/* 3D Scene Container */}
            <div className="relative w-[400px] h-[550px]" style={{ perspective: 1200 }}>
                <AnimatePresence mode="wait" custom={navDirection}>
                    <motion.div
                        key={step.id}
                        custom={navDirection}
                        initial={(dir) => ({ opacity: 0, x: dir === 'forward' ? 50 : -50 })}
                        animate={{ opacity: 1, x: 0 }}
                        exit={(dir) => ({ opacity: 0, x: dir === 'forward' ? -50 : 50 })}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full relative"
                    >
                        {/* The Flipping Card */}
                        <motion.div
                            className="w-full h-full relative preserve-3d cursor-pointer"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* FRONT FACE (Dynamic Animated Color) */}
                            <motion.div 
                                className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 text-white text-center cursor-pointer"
                                style={{ backfaceVisibility: 'hidden' }}
                                animate={{ 
                                    background: `linear-gradient(135deg, ${step.colors.from}, ${step.colors.to})`,
                                    boxShadow: `0 25px 50px -12px ${step.colors.from}40` // 40 is 25% opacity hex
                                }}
                                transition={{ duration: 0.5 }}
                                onClick={() => setIsFlipped(true)}
                            >
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <span className="text-2xl font-bold">{step.id}</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{step.title.split(': ')[1]}</h2>
                                <motion.p 
                                    animate={{ color: step.colors.light }} 
                                    className="font-medium"
                                >
                                    {step.subtitle}
                                </motion.p>
                                
                                <div className="absolute bottom-8 animate-bounce">
                                    <motion.p 
                                        animate={{ color: step.colors.light }} 
                                        className="text-sm font-bold tracking-widest uppercase"
                                    >
                                        Tap to flip
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* BACK FACE (Actionable Form) */}
                            <div 
                                className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden cursor-default"
                                style={{ 
                                    backfaceVisibility: 'hidden', 
                                    transform: 'rotateY(180deg)' 
                                }}
                            >
                                <div className="flex-1 flex flex-col p-8 pb-0 relative">
                                    {/* Close Button (X) */}
                                    <button 
                                        onClick={() => setIsFlipped(false)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>

                                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 tracking-tight mt-6">Sign in to SignalX</h2>
                                    <p className="text-center text-gray-500 text-sm mb-8">Welcome back! Please sign in to continue</p>

                                    {/* Side by Side OAuth Buttons */}
                                    <div className="flex gap-4 w-full mb-6">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition text-sm font-medium text-gray-700 shadow-sm">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            GitHub
                                        </button>
                                        
                                        <motion.button 
                                            whileTap={{ y: -3 }}
                                            onClick={() => {
                                                setPoppedCoin('google')
                                                setTimeout(() => setPoppedCoin(null), 800)
                                            }}
                                            className="relative flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition text-sm font-medium text-gray-700 shadow-sm"
                                        >
                                            <AnimatePresence>
                                                {poppedCoin === 'google' && (
                                                    <motion.div
                                                        initial={{ y: 0, opacity: 1, scale: 0.5, rotateY: 0 }}
                                                        animate={{ y: -80, opacity: 0, scale: 1.5, rotateY: 720 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                                        className="absolute top-0 w-8 h-8 bg-yellow-400 rounded-full border-[3px] border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.8)] flex items-center justify-center font-bold text-yellow-800 text-sm z-50"
                                                    >
                                                        $
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.415 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
                                                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.823l-4.04 3.067A11.965 11.965 0 0012 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
                                                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
                                                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
                                            </svg>
                                            Google
                                        </motion.button>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                        <span className="text-[13px] text-gray-500">or</span>
                                        <div className="flex-1 h-px bg-gray-200"></div>
                                    </div>

                                    {/* Email Form */}
                                    <div className="flex flex-col gap-1.5 mb-4">
                                        <label className="text-sm font-medium text-gray-900">Email address</label>
                                        <Input 
                                            type="email" 
                                            placeholder="Enter your email address" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="py-2.5 px-3 rounded-lg bg-white text-gray-900 border border-gray-300 shadow-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-black"
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div 
                                                key="error-block"
                                                initial={{ opacity: 0, height: 0 }} 
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="bg-red-50 border border-red-100 rounded-lg p-3 mb-3 flex flex-col items-center justify-center text-red-600 gap-2"
                                            >
                                                <div className="flex gap-2 text-3xl pt-1">
                                                    <motion.div
                                                        initial={{ y: -50, scale: 0.5, rotate: -45 }}
                                                        animate={{ y: 0, scale: 1, rotate: 0 }}
                                                        transition={{ type: "spring", bounce: 0.75, stiffness: 200, damping: 10 }}
                                                    >
                                                        🥺
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ y: -70, scale: 0.5, rotate: 45 }}
                                                        animate={{ y: 0, scale: 1, rotate: 0 }}
                                                        transition={{ type: "spring", bounce: 0.65, stiffness: 150, damping: 12, delay: 0.1 }}
                                                    >
                                                        😭
                                                    </motion.div>
                                                </div>
                                                <div className="text-[11px] font-semibold text-center uppercase tracking-wide">404 - Wait... we don't have a backend yet!</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button 
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        style={{ backgroundColor: '#24292f', color: '#ffffff', borderColor: 'rgba(27,31,36,0.15)' }}
                                        className="w-full font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm border hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Waiting...' : 'Submit'}
                                        {!isLoading && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                                    </button>
                                </div>

                                {/* Footer Area */}
                                <div className="mt-auto bg-[#F8F9FA] border-t border-gray-200 p-5 text-center">
                                    <p className="text-sm text-gray-500">
                                        Don't have an account? <a href="#" className="text-gray-900 font-medium hover:underline">Sign up</a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default OnboardingDeck

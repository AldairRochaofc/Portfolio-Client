"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface SuccessModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
    const { t } = useLanguage()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="bg-white dark:bg-[#231030] rounded-lg max-w-md w-full p-6 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                                    className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                                >
                                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </motion.div>

                                <h3 className="text-2xl font-bold mb-2 dark:text-[#e0d5e6]">{t("success.title")}</h3>

                                <p className="text-gray-600 dark:text-[#b8a2c5] mb-6">{t("success.message")}</p>

                                <Button
                                    onClick={onClose}
                                    className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 dark:bg-[#924a90] dark:hover:bg-[#7d3e7b]"
                                >
                                    {t("success.close")}
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 text-gray-500 dark:text-[#8a7a96] hover:bg-gray-100 dark:hover:bg-[#3d2150] rounded-full"
                                onClick={onClose}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

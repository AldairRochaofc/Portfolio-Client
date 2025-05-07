"use client"

import { useState, useRef, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { SuccessModal } from "./success-modal"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { t } = useLanguage()

  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)

      setTimeout(() => {
        if (formRef.current) {
          formRef.current.submit()
        }
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <form
        ref={formRef}
        action="https://formsubmit.co/thvrtiins@gmail.com"
        method="POST"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Campos ocultos para configuração do FormSubmit */}
        <input type="hidden" name="_next" value={currentUrl} />
        <input type="hidden" name="_subject" value="Nova mensagem do portfólio de arte!" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="dark:text-[#e0d5e6]">
              {t("contact.name")}
            </Label>
            <Input
              id="name"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              required
              className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-[#231030] dark:border-[#3d2150] dark:text-[#e0d5e6] dark:placeholder-[#8a7a96]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-[#e0d5e6]">
              {t("contact.email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("contact.emailPlaceholder")}
              required
              className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-[#231030] dark:border-[#3d2150] dark:text-[#e0d5e6] dark:placeholder-[#8a7a96]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="dark:text-[#e0d5e6]">
            {t("contact.subject")}
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder={t("contact.subjectPlaceholder")}
            required
            className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-[#231030] dark:border-[#3d2150] dark:text-[#e0d5e6] dark:placeholder-[#8a7a96]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="dark:text-[#e0d5e6]">
            {t("contact.message")}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t("contact.messagePlaceholder")}
            rows={6}
            required
            className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-[#231030] dark:border-[#3d2150] dark:text-[#e0d5e6] dark:placeholder-[#8a7a96]"
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 rounded-full py-6 px-8 text-lg dark:bg-[#924a90] dark:hover:bg-[#7d3e7b] relative overflow-hidden"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="h-6 w-6 rounded-full border-2 border-t-transparent border-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <span className="ml-2">{t("contact.sending")}</span>
                </motion.div>
              </div>
            </div>
          ) : (
            <>
              <motion.span initial={{ y: 0 }} whileHover={{ y: -30 }} className="inline-block">
                {t("contact.send")}
              </motion.span>
              <motion.span
                initial={{ y: 30, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {t("contact.send")} →
              </motion.span>
            </>
          )}
        </Button>
      </form>

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </>
  )
}

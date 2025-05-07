"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Mail, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ArtGallery from "@/components/art-gallery"
import { ContactForm } from "@/components/contact-form"
import { ThemeLanguageToggle } from "@/components/theme-language-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main className="min-h-screen">
      {/* Theme and Language Toggle */}
      <ThemeLanguageToggle />

      {/* Hero Section */}
      <section ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity, scale }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 dark:from-[#b76fb5] dark:via-[#8a4a87] dark:to-[#5c3a70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-[#b8a2c5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
            <Button asChild size="lg" className="rounded-full font-medium dark:bg-[#924a90] dark:hover:bg-[#7d3e7b]">
              <Link href="#gallery">
                {t("hero.button")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <ChevronDown className="h-8 w-8 text-gray-500 dark:text-[#8a7a96]" />
        </motion.div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-[#2d1241] dark:to-[#1a0b26] -z-10" />

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden -z-5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-300 to-pink-300 dark:from-[#5c3a70] dark:to-[#4a3670] opacity-20"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white dark:bg-[#1a0b26]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-[#e0d5e6]">{t("gallery.title")}</h2>
            <p className="text-xl text-gray-600 dark:text-[#b8a2c5] max-w-3xl mx-auto">{t("gallery.description")}</p>
          </motion.div>

          <ArtGallery />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#231030]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 dark:text-[#e0d5e6]">{t("about.title")}</h2>
              <p className="text-lg text-gray-600 dark:text-[#b8a2c5] mb-6">{t("about.paragraph1")}</p>
              <p className="text-lg text-gray-600 dark:text-[#b8a2c5] mb-6">{t("about.paragraph2")}</p>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full dark:border-[#5c3a70] dark:text-[#e0d5e6] dark:hover:bg-[#3d2150]"
              >
                <User className="mr-2 h-4 w-4" /> {t("about.button")}
              </Button>
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="Artista no estúdio"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-[#1a0b26]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-[#e0d5e6]">{t("contact.title")}</h2>
            <p className="text-xl text-gray-600 dark:text-[#b8a2c5] max-w-3xl mx-auto">{t("contact.description")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full dark:border-[#5c3a70] dark:text-[#e0d5e6] dark:hover:bg-[#3d2150]"
            >
              <Mail className="mr-2 h-4 w-4" /> contato@galeriadearte.com
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 dark:bg-[#231030] text-center">
        <p className="text-gray-600 dark:text-[#8a7a96]">
          © {new Date().getFullYear()} Galeria de Arte. {t("footer.rights")}
        </p>
      </footer>
    </main>
  )
}

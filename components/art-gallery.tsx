"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface Artwork {
  id: number
  title: string
  description: string
  image: string
  category: string
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Character Design",
    description: "Uma exploração de personagens com estilo único e personalizado.",
    image: "/placeholder.svg?height=600&width=800",
    category: "My Style",
  },
  {
    id: 2,
    title: "Adventure Time Fan Art",
    description: "Uma reinterpretação de personagens em estilo cartoon.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Cartoon",
  },
  {
    id: 3,
    title: "Kawaii Characters",
    description: "Personagens adoráveis em estilo chibi japonês.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Chibi",
  },
  {
    id: 4,
    title: "Emoji Pack",
    description: "Conjunto de stickers expressivos para uso digital.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Stickers",
  },
  {
    id: 5,
    title: "Wolf Character",
    description: "Personagem antropomórfico com características de lobo.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Furrys",
  },
  {
    id: 6,
    title: "Original Character",
    description: "Personagem original com estilo artístico único.",
    image: "/placeholder.svg?height=600&width=800",
    category: "My Style",
  },
]

const categories = ["Todos", "My Style", "Cartoon", "Chibi", "Stickers", "Furrys"]

export default function ArtGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const { t } = useLanguage()

  const filteredArtworks =
    selectedCategory === "Todos"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory)

  return (
    <div>
      {/* Filtros de categoria */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "rounded-full px-6",
              selectedCategory === category
                ? "bg-purple-600 hover:bg-purple-700 dark:bg-[#924a90] dark:hover:bg-[#7d3e7b]"
                : "hover:bg-purple-100 hover:text-purple-700 dark:border-[#5c3a70] dark:text-[#e0d5e6] dark:hover:bg-[#3d2150]"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "Todos" ? t("category.all") ?? "Todos" : category}
          </Button>
        ))}
      </motion.div>

      {/* Grade de obras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedArtwork(artwork)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg dark:shadow-[#000000]/30">
              <div className="aspect-w-4">
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={`Imagem da arte: ${artwork.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold">{artwork.title}</h3>
                <p className="text-white/80 mt-2">{artwork.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para visualização detalhada */}
      {selectedArtwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white dark:bg-[#231030] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 bg-white/20 backdrop-blur-sm rounded-full dark:bg-[#3d2150]/50 dark:text-[#e0d5e6]"
              onClick={() => setSelectedArtwork(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-[50vh] md:h-auto">
                <img
                  src={selectedArtwork.image || "/placeholder.svg"}
                  alt={`Imagem da arte: ${selectedArtwork.title}`}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2 dark:text-[#e0d5e6]">{selectedArtwork.title}</h3>
                <p className="text-sm text-purple-600 dark:text-[#b76fb5] mb-4">{selectedArtwork.category}</p>
                <p className="text-gray-600 dark:text-[#b8a2c5] mb-6">{selectedArtwork.description}</p>
                <div className="mt-auto">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-[#924a90] dark:hover:bg-[#7d3e7b]">
                    {t("gallery.requestInfo") ?? "Solicitar informações"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

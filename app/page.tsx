"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ShoppingCart,
  BookOpen,
  Search,
  ArrowLeft,
  Trash2,
  X,
  Download,
} from "lucide-react"

// Types
interface Book {
  id: number
  title: string
  author: string
  category: string
  price: number
  description: string
  preview: string[]
  coverColor: string
}

interface CartItem extends Book {
  quantity: number
}

// Mock Data
const mockBooks: Book[] = [
  {
    id: 1,
    title: "Estructuras de Datos y Algoritmos",
    author: "María García López",
    category: "Informática",
    price: 12500,
    description:
      "Una guía completa sobre estructuras de datos fundamentales y algoritmos esenciales para la programación moderna. Este libro cubre desde arrays y listas enlazadas hasta árboles y grafos. Incluye ejercicios prácticos y ejemplos en múltiples lenguajes de programación.",
    preview: [
      "Las estructuras de datos son la base fundamental de cualquier programa de computadora. Entender cómo organizar y manipular datos de manera eficiente es crucial para todo desarrollador de software.",
      "Los algoritmos de ordenamiento como QuickSort y MergeSort demuestran la importancia de elegir la estrategia correcta para cada problema. La complejidad temporal O(n log n) representa un equilibrio óptimo entre simplicidad y rendimiento.",
      "Los árboles binarios de búsqueda permiten operaciones de inserción, eliminación y búsqueda en tiempo logarítmico, haciéndolos ideales para bases de datos y sistemas de archivos.",
    ],
    coverColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Derecho Constitucional Argentino",
    author: "Roberto Fernández",
    category: "Derecho",
    price: 15800,
    description:
      "Análisis profundo de la Constitución Nacional Argentina y sus reformas. Incluye jurisprudencia actualizada de la Corte Suprema y análisis de casos emblemáticos. Texto esencial para estudiantes y profesionales del derecho.",
    preview: [
      "La Constitución Nacional de 1853, con sus sucesivas reformas, establece el marco jurídico fundamental de la República Argentina. Sus principios republicanos, federales y democráticos guían todo el ordenamiento legal.",
      "El control de constitucionalidad ejercido por el Poder Judicial garantiza la supremacía de la Constitución sobre todas las normas inferiores, protegiendo los derechos fundamentales de los ciudadanos.",
      "La reforma constitucional de 1994 introdujo importantes modificaciones, incluyendo la jerarquía constitucional de tratados de derechos humanos y la creación de nuevos órganos de control.",
    ],
    coverColor: "bg-red-700",
  },
  {
    id: 3,
    title: "Administración Estratégica",
    author: "Carolina Martínez",
    category: "Administración",
    price: 11200,
    description:
      "Métodos y herramientas para la gestión estratégica de organizaciones modernas. Casos de estudio de empresas latinoamericanas y análisis de tendencias globales. Enfoque práctico para la toma de decisiones empresariales.",
    preview: [
      "La planificación estratégica requiere un análisis exhaustivo del entorno competitivo, identificando oportunidades y amenazas que pueden afectar el desempeño organizacional a largo plazo.",
      "El modelo de las cinco fuerzas de Porter permite evaluar la intensidad competitiva de una industria, considerando proveedores, compradores, competidores, sustitutos y nuevos entrantes.",
      "La implementación exitosa de una estrategia depende de la alineación entre estructura, cultura y sistemas de la organización, requiriendo liderazgo efectivo y comunicación clara.",
    ],
    coverColor: "bg-green-600",
  },
  {
    id: 4,
    title: "Macroeconomía Aplicada",
    author: "Diego Rodríguez",
    category: "Economía",
    price: 13500,
    description:
      "Principios de macroeconomía con enfoque en economías emergentes y casos de estudio de América Latina. Análisis de políticas monetarias y fiscales. Herramientas para comprender los ciclos económicos.",
    preview: [
      "El Producto Interno Bruto (PIB) mide el valor total de bienes y servicios producidos en una economía durante un período determinado, sirviendo como indicador principal del crecimiento económico.",
      "La inflación representa el aumento sostenido del nivel general de precios, afectando el poder adquisitivo de la moneda y las decisiones de ahorro e inversión de los agentes económicos.",
      "Las políticas monetarias del banco central, como las tasas de interés y la emisión de dinero, son herramientas fundamentales para estabilizar la economía y controlar la inflación.",
    ],
    coverColor: "bg-purple-600",
  },
  {
    id: 5,
    title: "Desarrollo Web Full Stack",
    author: "Andrés Sánchez",
    category: "Informática",
    price: 14200,
    description:
      "Guía completa para el desarrollo de aplicaciones web modernas usando React, Node.js y bases de datos. Incluye proyectos prácticos y mejores prácticas de la industria. Actualizado con las últimas tecnologías.",
    preview: [
      "React revolucionó el desarrollo frontend con su modelo de componentes y el Virtual DOM, permitiendo crear interfaces de usuario interactivas y eficientes.",
      "Node.js permite ejecutar JavaScript en el servidor, unificando el lenguaje de programación en toda la aplicación y facilitando el desarrollo de APIs RESTful y GraphQL.",
      "Las bases de datos NoSQL como MongoDB ofrecen flexibilidad en el esquema de datos, siendo ideales para aplicaciones que requieren escalabilidad horizontal y manejo de datos no estructurados.",
    ],
    coverColor: "bg-cyan-600",
  },
  {
    id: 6,
    title: "Contratos Comerciales",
    author: "Laura Gómez",
    category: "Derecho",
    price: 16500,
    description:
      "Estudio detallado de los contratos comerciales en el derecho argentino. Análisis de contratos de compraventa, distribución, franquicia y más. Incluye modelos y cláusulas recomendadas.",
    preview: [
      "El contrato de compraventa comercial se distingue del civil por su finalidad de lucro y la aplicación de normas específicas del Código de Comercio y leyes especiales.",
      "Los contratos de distribución establecen relaciones de colaboración empresarial donde el distribuidor adquiere productos para revenderlos en un territorio determinado.",
      "La franquicia combina la cesión de marca, know-how y asistencia técnica, creando una red de negocios independientes pero integrados bajo una imagen corporativa común.",
    ],
    coverColor: "bg-amber-700",
  },
  {
    id: 7,
    title: "Gestión de Recursos Humanos",
    author: "Patricia Ruiz",
    category: "Administración",
    price: 10800,
    description:
      "Manual práctico de gestión del talento humano en organizaciones contemporáneas. Procesos de selección, capacitación, evaluación de desempeño y desarrollo organizacional. Enfoque en bienestar laboral.",
    preview: [
      "La gestión del talento humano ha evolucionado desde un enfoque administrativo hacia uno estratégico, reconociendo a las personas como el activo más valioso de las organizaciones.",
      "Los procesos de selección modernos combinan entrevistas por competencias, evaluaciones psicométricas y assessment centers para identificar candidatos con el mejor ajuste cultural.",
      "El desarrollo profesional continuo y los planes de carrera son fundamentales para retener el talento y mantener la motivación de los colaboradores en un mercado laboral competitivo.",
    ],
    coverColor: "bg-pink-600",
  },
  {
    id: 8,
    title: "Finanzas Corporativas",
    author: "Martín Álvarez",
    category: "Economía",
    price: 17200,
    description:
      "Fundamentos de finanzas empresariales: valuación, estructura de capital, presupuesto de inversiones y gestión del riesgo. Casos de empresas argentinas y latinoamericanas. Herramientas para la toma de decisiones financieras.",
    preview: [
      "El valor presente neto (VPN) es la herramienta fundamental para evaluar proyectos de inversión, considerando el valor del dinero en el tiempo y el costo de oportunidad del capital.",
      "La estructura de capital óptima equilibra deuda y capital propio para minimizar el costo promedio ponderado del capital (WACC) y maximizar el valor de la empresa.",
      "La gestión del capital de trabajo requiere equilibrar liquidez y rentabilidad, administrando eficientemente cuentas por cobrar, inventarios y cuentas por pagar.",
    ],
    coverColor: "bg-indigo-600",
  },
]

const categories = ["Informática", "Derecho", "Administración", "Economía"]

type View = "catalog" | "detail" | "cart" | "library"

export default function Bookstore() {
  const [currentView, setCurrentView] = useState<View>("catalog")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [library, setLibrary] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [readerBook, setReaderBook] = useState<Book | null>(null)
  const [showToast, setShowToast] = useState(false)

  // Filter books based on search and category
  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      !selectedCategory || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Cart functions
  const addToCart = (book: Book) => {
    const existing = cart.find((item) => item.id === book.id)
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...book, quantity: 1 }])
    }
    setCurrentView("cart")
  }

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Purchase function
  const confirmPurchase = () => {
    const purchasedBooks = cart.map(({ quantity, ...book }) => book)
    setLibrary([...library, ...purchasedBooks])
    setCart([])
    setPaymentMethod("")
    setCurrentView("library")
  }

  // Show download toast
  const handleDownload = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Format price in ARS
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#1a2744] text-white shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <button
            onClick={() => {
              setCurrentView("catalog")
              setSelectedBook(null)
            }}
            className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
          >
            <BookOpen className="size-6" />
            <span>EditorialAcadémica</span>
          </button>

          <nav className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView("library")}
              className="text-sm font-medium transition-colors hover:text-amber-400"
            >
              Mi Biblioteca
            </button>
            <button
              onClick={() => setCurrentView("cart")}
              className="relative transition-opacity hover:opacity-80"
            >
              <ShoppingCart className="size-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-[#1a2744]">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Catalog View */}
        {currentView === "catalog" && (
          <div>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por título, autor o categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 text-foreground shadow-sm transition-colors focus:border-[#1a2744] focus:outline-none focus:ring-2 focus:ring-[#1a2744]/20"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-[#1a2744] text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1a2744] text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Books Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Book Cover */}
                  <div
                    className={`${book.coverColor} flex h-48 items-center justify-center`}
                  >
                    <BookOpen className="size-16 text-white/80" />
                  </div>
                  {/* Book Info */}
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {book.category}
                    </Badge>
                    <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground">
                      {book.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1a2744]">
                        {formatPrice(book.price)}
                      </span>
                      <Button
                        onClick={() => {
                          setSelectedBook(book)
                          setCurrentView("detail")
                        }}
                        className="bg-amber-500 text-[#1a2744] hover:bg-amber-600"
                        size="sm"
                      >
                        Ver detalle
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No se encontraron libros que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Book Detail View */}
        {currentView === "detail" && selectedBook && (
          <div>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al catálogo
            </Button>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Book Cover */}
              <div
                className={`${selectedBook.coverColor} flex h-80 items-center justify-center rounded-lg lg:h-96`}
              >
                <BookOpen className="size-24 text-white/80" />
              </div>

              {/* Book Info */}
              <div className="lg:col-span-2">
                <Badge variant="secondary" className="mb-3">
                  {selectedBook.category}
                </Badge>
                <h1 className="mb-2 text-3xl font-bold text-[#1a2744]">
                  {selectedBook.title}
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">
                  por {selectedBook.author}
                </p>
                <p className="mb-6 text-foreground leading-relaxed">
                  {selectedBook.description}
                </p>
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#1a2744]">
                    {formatPrice(selectedBook.price)}
                  </span>
                  <Button
                    onClick={() => addToCart(selectedBook)}
                    className="bg-amber-500 text-[#1a2744] hover:bg-amber-600"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 size-5" />
                    Agregar al carrito
                  </Button>
                </div>

                {/* Preview Section */}
                <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-6">
                  <h2 className="mb-4 text-xl font-semibold text-[#1a2744]">
                    Vista previa
                  </h2>
                  <div className="space-y-4">
                    {selectedBook.preview.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart View */}
        {currentView === "cart" && (
          <div>
            <h1 className="mb-8 text-2xl font-bold text-[#1a2744]">
              Carrito de Compras
            </h1>

            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingCart className="mx-auto mb-4 size-16 text-muted-foreground" />
                <p className="mb-4 text-muted-foreground">
                  Tu carrito está vacío
                </p>
                <Button
                  onClick={() => setCurrentView("catalog")}
                  className="bg-amber-500 text-[#1a2744] hover:bg-amber-600"
                >
                  Explorar catálogo
                </Button>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-4 lg:col-span-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <div
                        className={`${item.coverColor} flex size-20 shrink-0 items-center justify-center rounded`}
                      >
                        <BookOpen className="size-8 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.author}
                        </p>
                        <p className="mt-1 font-bold text-[#1a2744]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                    Resumen del pedido
                  </h2>
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between text-lg font-bold text-card-foreground">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-card-foreground">
                      Seleccionar medio de pago
                    </label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Elegir método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">
                          Tarjeta de crédito
                        </SelectItem>
                        <SelectItem value="debit">Débito</SelectItem>
                        <SelectItem value="transfer">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={confirmPurchase}
                    disabled={!paymentMethod}
                    className="w-full bg-amber-500 text-[#1a2744] hover:bg-amber-600 disabled:opacity-50"
                  >
                    Confirmar compra
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Library View */}
        {currentView === "library" && (
          <div>
            <h1 className="mb-8 text-2xl font-bold text-[#1a2744]">
              Mi Biblioteca
            </h1>

            {library.length === 0 ? (
              <div className="py-12 text-center">
                <BookOpen className="mx-auto mb-4 size-16 text-muted-foreground" />
                <p className="mb-4 text-muted-foreground">
                  Aún no tienes libros en tu biblioteca
                </p>
                <Button
                  onClick={() => setCurrentView("catalog")}
                  className="bg-amber-500 text-[#1a2744] hover:bg-amber-600"
                >
                  Explorar catálogo
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {library.map((book, index) => (
                  <div
                    key={`${book.id}-${index}`}
                    className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                  >
                    {/* Book Cover */}
                    <div
                      className={`${book.coverColor} flex h-40 items-center justify-center`}
                    >
                      <BookOpen className="size-12 text-white/80" />
                    </div>
                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground">
                        {book.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setReaderBook(book)}
                          className="flex-1 bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                          size="sm"
                        >
                          <BookOpen className="mr-1 size-4" />
                          Leer
                        </Button>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Download className="mr-1 size-4" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Reader Modal */}
      <Dialog open={!!readerBook} onOpenChange={() => setReaderBook(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1a2744]">
              {readerBook?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              por {readerBook?.author}
            </p>
            <div className="space-y-4 rounded-lg bg-secondary/30 p-6">
              {readerBook?.preview.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
              <p className="mt-6 text-center text-sm italic text-muted-foreground">
                {"[Continúa en el libro completo...]"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-[#1a2744] px-4 py-3 text-white shadow-lg">
          <Download className="size-5" />
          <span>Descarga iniciada</span>
          <button
            onClick={() => setShowToast(false)}
            className="ml-2 hover:opacity-80"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}

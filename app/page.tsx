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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ShoppingCart,
  BookOpen,
  Search,
  ArrowLeft,
  Trash2,
  X,
  Download,
  Minus,
  Plus,
  User,
  LogOut,
  Settings,
  Save,
  Lock,
  AlertTriangle,
  Heart,
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
  {
    id: 9,
    title: "Análisis y diseño de sistemas",
    author: "Kenneth E. Kendall, Julie E. Kendall",
    category: "Informática",
    price: 20200,
    description:
      "El objetivo del libro es brindar a los estudiantes las competencias necesarias para el desarrollo de software y la implementación de tecnología, tiene un enfoque integral, ya que se relaciona de manera interdisciplinaria con otras materias.",
    preview: [
      "Se espera que los estudiantes sean capaces de: Modelar los procesos de desarrollo de software, ya sea a través de la UML o enfoques jerárquicos, analizar y diseñar sistemas informáticos, aprender sobre el ciclo de vida del software, desde la planificación hasta la implementación y el mantenimiento, aprender, aplicar la cultura profesional en el desarrollo de software, aplicar soluciones informáticas para resolver problemas. Los contenidos de desarrollo de software e Implementación de Tecnología es una asignatura esencial para la formación de profesionales en el ámbito de la informática. Proporciona a los estudiantes las competencias necesarias para el desarrollo de software y la implementación de tecnología, lo que les permitirá desempeñarse exitosamente en el campo laboral."
    ],
    coverColor: "bg-indigo-600",
  },
  {
    id: 10,
    title: "El mundo de Sofía",
    author: "Jostein Gaarder",
    category: "Filosofía",
    price: 18500,
    description: "Una novela sobre la historia de la filosofía que invita a reflexionar sobre las grandes preguntas del pensamiento humano a través de un entretenido relato de ficción.",
    preview: ["Un día, al volver del instituto, Sofía Amundsen encuentra una carta en el buzón con una única pregunta: ¿Quién eres? Así comienza un apasionante viaje a lo largo y ancho de la historia de la filosofía."],
    coverColor: "bg-teal-600",
  },
  {
    id: 11,
    title: "Pensar rápido, pensar despacio",
    author: "Daniel Kahneman",
    category: "Psicología",
    price: 21000,
    description: "Un revolucionario recorrido por la mente humana que explica los dos sistemas que modelan cómo pensamos: el sistema 1, rápido, intuitivo y emocional, y el sistema 2, más lento, deliberativo y lógico.",
    preview: ["La premisa básica de este libro es que es más fácil reconocer los errores de los demás que los nuestros. Nuestros sesgos cognitivos moldean gran parte de nuestras decisiones cotidianas sin que nos demos cuenta."],
    coverColor: "bg-orange-600",
  },
  {
    id: 12,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    category: "Literatura Clásica",
    price: 19500,
    description: "La obra maestra del realismo mágico latinoamericano. Narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo mítico de Macondo.",
    preview: ["Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo."],
    coverColor: "bg-emerald-700",
  },
  {
    id: 13,
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    category: "Historia",
    price: 23400,
    description: "Un fascinante recorrido por la breve historia de la humanidad. Desde los primeros humanos que caminaron sobre la Tierra hasta los radicales y a veces devastadores avances de las revoluciones cognitiva, agrícola y científica.",
    preview: ["Hace cien mil años, al menos seis especies de homínidos habitaban la Tierra. Hoy en día, solo queda una: el Homo sapiens. ¿Cómo logró nuestra especie imponerse en la lucha por la supervivencia y convertirse en el ser dominante del planeta?"],
    coverColor: "bg-slate-700",
  },
  {
    id: 14,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    category: "Ciencia Ficción",
    price: 17200,
    description: "Un clásico de la literatura distópica. En una sociedad futura donde los libros están prohibidos, el bombero Guy Montag empieza a cuestionarse su labor de destruirlos.",
    preview: ["Constituía un placer especial ver las cosas consumidas, ver los objetos ennegrecidos y cambiados. Con la punta de bronce del soplete en sus puños, con aquella gigantesca serpiente pitón escupiendo su queroseno venenoso sobre el mundo, la sangre le latía en la cabeza y sus manos eran las de un fantástico director tocando todas las sinfonías del fuego y de las llamas para destruir los guiñapos y ruinas de la Historia."],
    coverColor: "bg-red-900",
  }
]

const categories = ["Informática", "Derecho", "Administración", "Economía", "Filosofía", "Psicología", "Literatura Clásica", "Historia", "Ciencia Ficción"]

type View = "login" | "catalog" | "detail" | "cart" | "library" | "account" | "favorites"

export default function Bookstore() {
  const [currentView, setCurrentView] = useState<View>("catalog")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [cart, setCart] = useState<Book[]>([])
  const [library, setLibrary] = useState<Book[]>([])
  const [favorites, setFavorites] = useState<Book[]>([])
  const [loginPromptAction, setLoginPromptAction] = useState<"favorite" | "cart" | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [readerBook, setReaderBook] = useState<Book | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    name: "Usuario de Prueba",
    email: "usuario@ejemplo.com",
    phone: "+54 11 1234-5678"
  })
  const [sortBy, setSortBy] = useState<string>("popular")
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [registeredUsers, setRegisteredUsers] = useState<{email: string, password: string}[]>([
    { email: "usuario@ejemplo.com", password: "123456" }
  ])

  // Filter books based on category (searchQuery no afecta al catálogo visual)
  const filteredBooks = mockBooks.filter((book) => {
    const matchesCategory =
      !selectedCategory || book.category === selectedCategory
    return matchesCategory
  })

  // Search results para el dropdown
  const searchResults = searchQuery.trim() === "" ? [] : mockBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "alpha-asc":
        return a.title.localeCompare(b.title)
      case "alpha-desc":
        return b.title.localeCompare(a.title)
      case "popular":
      default:
        return a.id - b.id
    }
  })

  // Cart functions
  const addToCart = (book: Book) => {
    if (!isLoggedIn) {
      setLoginPromptAction("cart")
      return
    }
    const existing = cart.find((item) => item.id === book.id)
    if (existing) {
      setCart(cart.filter((item) => item.id !== book.id))
      showToast("Eliminado del carrito")
    } else {
      setCart([...cart, book])
      showToast("Añadido al carrito")
    }
  }

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter((item) => item.id !== bookId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
  const cartCount = cart.length

  // Purchase function
  const confirmPurchase = () => {
    setLibrary([...library, ...cart])
    setCart([])
    setPaymentMethod("")
    setCurrentView("library")
  }

  // Show toast
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleFavorite = (book: Book) => {
    if (!isLoggedIn) {
      setLoginPromptAction("favorite")
      return
    }

    if (favorites.some(fav => fav.id === book.id)) {
      setFavorites(favorites.filter(fav => fav.id !== book.id))
      showToast("Eliminado de favoritos")
    } else {
      setFavorites([...favorites, book])
      showToast("Añadido a favoritos")
    }
  }

  const handleDownload = (bookTitle: string) => {
    showToast("Descarga iniciada")

    setTimeout(() => {
      // PDF base64 de una página en blanco
      const pdfBase64 = "JVBERi0xLjAKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQo+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmCjAwMDAwMDAwMDkgMDAwMDAgbgowMDAwMDAwMDUyIDAwMDAwIG4KMDAwMDAwMDEwNCAwMDAwMCBuCnRyYWlsZXIKPDwKL1NpemUgNAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMTczCiUlRU9G"

      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = `${bookTitle.replace(/[\s\W]+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Descarga finalizada")
    }, 1500)
  }

  // Format price in ARS
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleLogin = () => {
    const userExists = registeredUsers.some(user => user.email === username.trim() && user.password === password)
    if (userExists) {
      setLoginError(false)
      setIsLoggedIn(true)
      setCurrentView("catalog")
    } else {
      setLoginError(true)
    }
  }

  const handleRegister = () => {
    if (username.trim() !== "" && password !== "") {
      const userExists = registeredUsers.some(user => user.email === username.trim())
      if (userExists) {
        showToast("El usuario ya existe. Por favor, iniciá sesión.")
      } else {
        setRegisteredUsers([...registeredUsers, { email: username.trim(), password }])
        showToast("Cuenta creada exitosamente. Por favor, iniciá sesión.")
        setIsRegistering(false)
        setPassword("")
      }
    } else {
      showToast("Por favor, completa todos los campos.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      {currentView !== "login" && (
        <header className="sticky top-0 z-50 bg-[#1a2744] text-white shadow-lg">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
            <button
              onClick={() => {
                setCurrentView("catalog")
                setSelectedBook(null)
              }}
              className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
            >
              <BookOpen className="size-6" />
              <span>MercadoLibro</span>
            </button>

            <nav className="flex items-center gap-4 md:gap-6">
              {isLoggedIn && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentView("library")}
                    className="text-white hover:text-amber-500 hover:bg-transparent px-2"
                    title="Mi biblioteca"
                  >
                    <BookOpen className="mr-2 size-5" />
                    <span className="hidden sm:inline">Mi biblioteca</span>
                  </Button>
                  <button
                    onClick={() => setCurrentView("favorites")}
                    className="flex items-center justify-center transition-opacity hover:opacity-80"
                    title="Mis Favoritos"
                  >
                    <Heart className="size-6 text-amber-500 fill-amber-500" />
                  </button>
                </>
              )}
              
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

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full bg-amber-500 text-[#1a2744] hover:bg-amber-400 hover:text-[#1a2744] transition-colors"
                    >
                      <User className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setCurrentView("account")}
                      className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                    >
                      <Settings className="mr-2 size-4" />
                      <span>Mi Cuenta</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setIsLoggedIn(false)
                        setCurrentView("catalog")
                        setUsername("")
                        setPassword("")
                      }}
                      className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <LogOut className="mr-2 size-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setCurrentView("login")}
                  className="h-8 rounded-full bg-amber-500 px-4 text-xs font-bold text-[#1a2744] hover:bg-amber-400 transition-colors"
                >
                  Iniciar Sesión
                </Button>
              )}
            </nav>
          </div>
        </header>
      )}

      <main className={`w-full flex-1 mx-auto max-w-[1600px] px-4 md:px-8 py-8 ${currentView === "login" ? "flex items-center justify-center p-4" : ""}`}>
        {/* Login View */}
        {currentView === "login" && (
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-[#1a2744] shadow-md">
                <BookOpen className="size-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#1a2744]">MercadoLibro</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isRegistering ? "Crea una cuenta para comenzar" : "Ingresa tus credenciales para continuar"}
              </p>
            </div>

            <div className="space-y-5">
              {loginError && !isRegistering && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-600">
                  Usuario o contraseña incorrectos. Podés usar:<br /> <span className="font-bold">usuario@ejemplo.com</span> / <span className="font-bold">123456</span>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">Email / Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setLoginError(false)
                  }}
                  placeholder="usuario@ejemplo.com"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground transition-all hover:border-[#1a2744]/50 focus:border-[#1a2744] focus:outline-none focus:ring-4 focus:ring-[#1a2744]/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-card-foreground">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setLoginError(false)
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground transition-all hover:border-[#1a2744]/50 focus:border-[#1a2744] focus:outline-none focus:ring-4 focus:ring-[#1a2744]/10"
                />
                {!isRegistering && (
                  <div className="flex justify-center pt-1">
                    <button type="button" className="text-sm font-medium text-[#1a2744] hover:underline focus:outline-none">Olvidé mi contraseña</button>
                  </div>
                )}
              </div>
              <Button
                onClick={isRegistering ? handleRegister : handleLogin}
                className="mt-6 w-full bg-[#1a2744] py-6 text-base font-semibold text-white transition-all hover:bg-[#1a2744]/90 hover:shadow-lg disabled:opacity-50"
                disabled={!username || !password}
              >
                {isRegistering ? "Crear cuenta" : "Iniciar Sesión"}
              </Button>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"} {" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering)
                    setLoginError(false)
                    setPassword("")
                  }}
                  className="font-semibold text-[#1a2744] hover:underline focus:outline-none"
                >
                  {isRegistering ? "Iniciar sesión" : "Crear cuenta"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Catalog View */}
        {currentView === "catalog" && (
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Left Sidebar */}
              <aside className="w-full shrink-0 md:w-64 space-y-6">
                {/* Category Filter */}
                <div>
                  <button
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex w-full items-center justify-between mb-4 hover:opacity-80 transition-opacity focus:outline-none"
                  >
                    <h2 className="text-lg font-semibold text-[#1a2744]">Categorías</h2>
                    <span className="text-[#1a2744] bg-secondary/50 rounded-full p-1 border border-border">
                      {isCategoriesOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>

                  {isCategoriesOpen && (
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#1a2744]/10 ml-1">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors ${!selectedCategory
                          ? "bg-[#1a2744] text-white"
                          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                          }`}
                      >
                        Todos
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category
                            ? "bg-[#1a2744] text-white"
                            : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-8 flex flex-col gap-6">
                  {/* Search Bar */}
                  <div className="relative w-full z-30">
                    <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar por título, autor o categoría..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background py-2.5 pl-12 pr-4 text-foreground shadow-sm transition-colors focus:border-[#1a2744] focus:outline-none focus:ring-2 focus:ring-[#1a2744]/20"
                    />

                    {/* Dropdown de Resultados */}
                    {searchQuery.trim() !== "" && (
                      <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-card shadow-xl max-h-96 overflow-y-auto overflow-x-hidden">
                        {searchResults.length > 0 ? (
                          <div className="p-2 space-y-1">
                            {searchResults.map((book) => (
                              <div
                                key={book.id}
                                onClick={() => {
                                  setSelectedBook(book)
                                  setCurrentView("detail")
                                  setSearchQuery("")
                                }}
                                className="group/result flex gap-4 p-3 cursor-pointer hover:bg-secondary/60 rounded-md transition-colors items-center border border-transparent hover:border-border/50"
                              >
                                <div className={`${book.coverColor} size-12 sm:size-14 shrink-0 rounded flex items-center justify-center shadow-sm`}>
                                  <BookOpen className="size-6 sm:size-7 text-white/80 transition-transform group-hover/result:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm sm:text-base text-card-foreground group-hover/result:text-[#1a2744] truncate transition-colors">{book.title}</h4>
                                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{book.author} <span className="opacity-50 mx-1">•</span> {book.category}</p>
                                </div>
                                <div className="font-bold text-sm sm:text-base text-[#1a2744] shrink-0 pl-2">
                                  {formatPrice(book.price)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center flex flex-col items-center justify-center">
                            <Search className="size-8 text-muted-foreground/50 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">
                              No se encontraron resultados para "{searchQuery}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Banner Section */}
                  <div className="relative flex flex-col md:flex-row w-full mb-4 rounded-[2rem] bg-card border border-border/50 shadow-[0_0px_35px_rgba(0,0,0,0.08)] overflow-hidden group">
                    {/* Borde superior llamativo */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-[#1a2744] z-20"></div>

                    {/* Imagen a la Izquierda (Ocupa todo el espacio vertical sin blancos) */}
                    <div className="w-full md:w-1/2 relative min-h-[280px] md:min-h-[360px] order-1">
                      <img
                        src="/images/inicio2.png"
                        alt="Banner de inicio"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Texto a la Derecha (con texto alineado a la izquierda) */}
                    <div className="relative z-10 w-full md:w-1/2 px-6 py-10 md:px-12 md:py-14 text-center md:text-left flex flex-col justify-center bg-card order-2">
                      {/* Luces ambientales */}
                      <div className="absolute top-0 right-0 -mt-16 -mr-16 size-80 rounded-full bg-[#1a2744]/5 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
                      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 size-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>

                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed relative z-10">
                        Descubrí nuevas lecturas, encontrá tus títulos favoritos, descargalos donde quieras y llevá tu biblioteca donde vayas. Compra segura, descarga inmediata. Empezá tu próxima lectura hoy mismo.
                      </p>
                      <p className="mt-4 text-2xl md:text-3xl font-bold text-[#1a2744] relative z-10">
                        ¡Adelante!
                      </p>
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="w-full sm:w-56 shrink-0 sm:self-end">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full rounded-lg border-border bg-background shadow-sm">
                        <SelectValue placeholder="Ordenar por..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Más populares</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
                        <SelectItem value="alpha-asc">Alfabéticamente (A-Z)</SelectItem>
                        <SelectItem value="alpha-desc">Alfabéticamente (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Books Grid */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {sortedBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => {
                        setSelectedBook(book)
                        setCurrentView("detail")
                      }}
                      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-[#1a2744]/30"
                    >
                      {/* Book Cover */}
                      <div
                        className={`${book.coverColor} flex h-48 shrink-0 items-center justify-center`}
                      >
                        <BookOpen className="size-16 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {/* Book Info */}
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex">
                          <Badge variant="secondary" className="mb-2">
                            {book.category}
                          </Badge>
                        </div>
                        <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground group-hover:text-[#1a2744] transition-colors">
                          {book.title}
                        </h3>
                        <p className="mb-3 text-sm text-muted-foreground">
                          {book.author}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-lg font-bold text-[#1a2744]">
                            {formatPrice(book.price)}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(book)
                              }}
                              variant="ghost"
                              size="icon"
                              className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                              title={favorites.some(fav => fav.id === book.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                            >
                              <Heart className={`size-5 ${favorites.some(fav => fav.id === book.id) ? "fill-amber-500" : ""}`} />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                addToCart(book)
                              }}
                              className={`${cart.some(item => item.id === book.id) ? "bg-amber-600" : "bg-amber-500"} text-[#1a2744] hover:bg-amber-600 shrink-0`}
                              size="icon"
                              title={cart.some(item => item.id === book.id) ? "Quitar del carrito" : "Añadir al carrito"}
                            >
                              <ShoppingCart className={`size-5 ${cart.some(item => item.id === book.id) ? "fill-[#1a2744]" : ""}`} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {sortedBooks.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No se encontraron libros que coincidan con tu búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </div>


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
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleFavorite(selectedBook)}
                      variant="outline"
                      size="icon"
                      className="border-amber-500 text-amber-500 hover:bg-amber-50 h-11 w-11"
                    >
                      <Heart className={`size-5 ${favorites.some(fav => fav.id === selectedBook.id) ? "fill-amber-500" : ""}`} />
                    </Button>
                    <Button
                      onClick={() => addToCart(selectedBook)}
                      className={`${cart.some(item => item.id === selectedBook.id) ? "bg-amber-600" : "bg-amber-500"} text-[#1a2744] hover:bg-amber-600`}
                      size="lg"
                    >
                      <ShoppingCart className={`mr-2 size-5 ${cart.some(item => item.id === selectedBook.id) ? "fill-[#1a2744]" : ""}`} />
                      {cart.some(item => item.id === selectedBook.id) ? "Quitar del carrito" : "Agregar al carrito"}
                    </Button>
                  </div>
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
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al catálogo
            </Button>
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
                      onClick={() => {
                        setSelectedBook(item)
                        setCurrentView("detail")
                      }}
                      className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:border-[#1a2744]/30 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div
                        className={`${item.coverColor} flex size-20 shrink-0 items-center justify-center rounded`}
                      >
                        <BookOpen className="size-8 text-white/80 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground group-hover:text-[#1a2744] transition-colors">
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
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFromCart(item.id)
                        }}
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

                  {(paymentMethod === "credit" || paymentMethod === "debit") && (
                    <div className="mb-4 space-y-3 rounded-lg border border-border bg-muted/50 p-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-card-foreground">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-card-foreground">
                            Vencimiento
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-card-foreground">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-card-foreground">
                          Nombre del titular
                        </label>
                        <input
                          type="text"
                          placeholder="Juan Pérez"
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                        />
                      </div>
                    </div>
                  )}

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

        {/* Favorites View */}
        {currentView === "favorites" && (
          <div>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al catálogo
            </Button>
            <h1 className="mb-8 text-2xl font-bold text-[#1a2744]">
              Mis Favoritos
            </h1>

            {favorites.length === 0 ? (
              <div className="py-12 text-center">
                <Heart className="mx-auto mb-4 size-16 text-muted-foreground" />
                <p className="mb-4 text-muted-foreground">
                  Aún no tienes libros favoritos
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
                {favorites.map((book, index) => (
                  <div
                    key={`${book.id}-${index}`}
                    onClick={() => {
                      setSelectedBook(book)
                      setCurrentView("detail")
                    }}
                    className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm cursor-pointer hover:shadow-md hover:border-[#1a2744]/30 transition-all"
                  >
                    {/* Book Cover */}
                    <div
                      className={`${book.coverColor} flex h-40 shrink-0 items-center justify-center`}
                    >
                      <BookOpen className="size-12 text-white/80" />
                    </div>
                    {/* Book Info */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground">
                        {book.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-bold text-[#1a2744]">
                          {formatPrice(book.price)}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(book)
                            }}
                            variant="ghost"
                            size="icon"
                            className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                          >
                            <Heart className="size-5 fill-amber-500" />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart(book)
                            }}
                            className={`${cart.some(item => item.id === book.id) ? "bg-amber-600" : "bg-amber-500"} text-[#1a2744] hover:bg-amber-600 shrink-0`}
                            size="icon"
                            title={cart.some(item => item.id === book.id) ? "Quitar del carrito" : "Añadir al carrito"}
                          >
                            <ShoppingCart className={`size-5 ${cart.some(item => item.id === book.id) ? "fill-[#1a2744]" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Library View */}
        {currentView === "library" && (
          <div>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al catálogo
            </Button>
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
                    className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                  >
                    {/* Book Cover */}
                    <div
                      className={`${book.coverColor} flex h-40 shrink-0 items-center justify-center`}
                    >
                      <BookOpen className="size-12 text-white/80" />
                    </div>
                    {/* Book Info */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground">
                        {book.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <div className="mt-auto flex gap-2">
                        <Button
                          onClick={() => setReaderBook(book)}
                          className="flex-1 bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                          size="sm"
                        >
                          <BookOpen className="mr-1 size-4" />
                          Leer
                        </Button>
                        <Button
                          onClick={() => handleDownload(book.title)}
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

        {/* Account View */}
        {currentView === "account" && (
          <div className="mx-auto max-w-3xl">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 size-4" />
              Volver al catálogo
            </Button>
            <h1 className="mb-8 text-2xl font-bold text-[#1a2744]">
              Ajustes de mi cuenta
            </h1>

            <div className="space-y-8">
              {/* Profile Details */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#1a2744]/10">
                    <User className="size-5 text-[#1a2744]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">Información Personal</h2>
                    <p className="text-sm text-muted-foreground">Actualizá tus datos de contacto.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Nombre completo</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Teléfono</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Correo electrónico</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => showToast("Perfil actualizado")} className="bg-[#1a2744] text-white hover:bg-[#1a2744]/90">
                      <Save className="mr-2 size-4" />
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#1a2744]/10">
                    <Lock className="size-5 text-[#1a2744]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">Seguridad</h2>
                    <p className="text-sm text-muted-foreground">Modificá tu contraseña.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground">Contraseña actual</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Nueva contraseña</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-card-foreground">Confirmar nueva contraseña</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-[#1a2744] focus:outline-none focus:ring-1 focus:ring-[#1a2744]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="outline" onClick={() => showToast("Contraseña actualizada")} className="border-[#1a2744] text-[#1a2744] hover:bg-[#1a2744]/5">
                      Cambiar contraseña
                    </Button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10">
                    <AlertTriangle className="size-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-destructive">Zona de Peligro</h2>
                    <p className="text-sm text-destructive/80">Cuidado, esta acción es irreversible.</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-destructive/10 pt-4">
                  <div className="space-y-1">
                    <h3 className="font-medium text-card-foreground">Eliminar cuenta</h3>
                    <p className="text-sm text-muted-foreground w-full max-w-md">
                      Una vez que elimines tu cuenta, no hay vuelta atrás. Se borrará toda tu información, incluyendo los libros en tu biblioteca.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm("¿Estás seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.")) {
                        setIsLoggedIn(false)
                        setCurrentView("login")
                        setUsername("")
                        setPassword("")
                        showToast("Cuenta eliminada correctamente")
                      }
                    }}
                  >
                    Eliminar mi cuenta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer (Full Width sin margenes) */}
      {currentView === "catalog" && (
        <footer className="w-full bg-[#1a2744] py-12 md:py-16 text-sm text-white/80 mt-auto">
          <div className="mx-auto max-w-[1600px] px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Quienes somos */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white">¿Quiénes somos?</h3>
              <p className="leading-relaxed">
                Somos MercadoLibro, tu biblioteca virtual del Chaco al mundo. Nos dedicamos a acercar el conocimiento a cada rincón. Contamos con una amplia trayectoria recomendando y promoviendo el hábito de la lectura.
              </p>
            </div>

            {/* Medios de pago */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white">Medios de pago</h3>
              <ul className="space-y-2 leading-relaxed">
                <li className="flex items-center gap-2">• Tarjeta de crédito</li>
                <li className="flex items-center gap-2">• Débito</li>
                <li className="flex items-center gap-2">• Transferencia bancaria</li>
              </ul>
            </div>

            {/* Contactanos */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-white">Contáctanos</h3>
              <p className="leading-relaxed">
                Estamos para ayudarte ante cualquier consulta.
              </p>
              <ul className="space-y-2 mt-2">
                <li><strong className="font-semibold text-white">Email:</strong> ayuda@mercadolibro.com.ar</li>
                <li><strong className="font-semibold text-white">Teléfono:</strong> +54 362 412-3456</li>
              </ul>
            </div>
          </div>
        </footer>
      )}

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
      {/* Login Prompt Dialog */}
      <Dialog open={loginPromptAction !== null} onOpenChange={(open) => !open && setLoginPromptAction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2744]">
              Acción requerida
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
            <AlertTriangle className="size-12 text-amber-500" />
            <p className="text-muted-foreground">
              {loginPromptAction === "favorite"
                ? "Para agregar libros a tus favoritos necesitas iniciar sesión en tu cuenta."
                : "Para añadir libros al carrito necesitas iniciar sesión en tu cuenta."}
            </p>
            <Button
              onClick={() => {
                setLoginPromptAction(null)
                setCurrentView("login")
              }}
              className="mt-4 w-full bg-[#1a2744] hover:bg-[#1a2744]/90 text-white"
            >
              Ir a Iniciar Sesión
            </Button>
            <Button
              variant="outline"
              onClick={() => setLoginPromptAction(null)}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-[#1a2744] px-4 py-3 text-white shadow-lg">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}

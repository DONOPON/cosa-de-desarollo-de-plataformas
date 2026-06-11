const ProductoModel = (function () {
  "use strict";

  let cache = [];

  // 🔽 MENÚ DE RESPALDO CON TUS ENLACES DE PEXELS (COMPATIBLES CON GITHUB PAGES)
  const menuDePrueba = [
    {
      id: 1,
      nombre: "Encebollado",
      categoria: "Sopas",
      descripcion: "Caldo de albacora con yuca, tomate y cebolla curtida.",
      precio: 8.5,
      stock: 50,
      imagen: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=640"
    },
    {
      id: 2,
      nombre: "Locro de papa",
      categoria: "Sopas",
      descripcion: "Sopa cremosa de papa con queso fresco y aguacate.",
      precio: 7.0,
      stock: 40,
      imagen: "https://images.pexels.com/photos/1527838/pexels-photo-1527838.jpeg?w=640"
    },
    {
      id: 3,
      nombre: "Caldo de patas",
      categoria: "Sopas",
      descripcion: "Caldo de pata de res con maní, mote y aguacate.",
      precio: 7.5,
      stock: 35,
      imagen: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?w=640"
    },
    {
      id: 4,
      nombre: "Llapingachos",
      categoria: "Platos fuertes",
      descripcion: "Tortillas de papa con queso, chorizo y huevo frito.",
      precio: 9.5,
      stock: 30,
      imagen: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?w=640"
    },
    {
      id: 5,
      nombre: "Hornado",
      categoria: "Platos fuertes",
      descripcion: "Cerdo horneado con mote y llapingachos.",
      precio: 12.0,
      stock: 25,
      imagen: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?w=640"
    },
    {
      id: 6,
      nombre: "Seco de pollo",
      categoria: "Platos fuertes",
      descripcion: "Pollo guisado con cerveza y naranjilla.",
      precio: 9.0,
      stock: 40,
      imagen: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?w=640"
    },
    {
      id: 7,
      nombre: "Ceviche de camarón",
      categoria: "Mariscos",
      descripcion: "Camarón fresco con limón y chifles.",
      precio: 11.0,
      stock: 30,
      imagen: "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?w=640"
    },
    {
      id: 8,
      nombre: "Encocado de pescado",
      categoria: "Mariscos",
      descripcion: "Pescado en salsa de coco con especias.",
      precio: 13.5,
      stock: 20,
      imagen: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?w=640"
    },
    {
      id: 9,
      nombre: "Bolón de verde",
      categoria: "Desayunos",
      descripcion: "Masa de plátano verde rellena de queso.",
      precio: 5.5,
      stock: 45,
      imagen: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg?w=640"
    },
    {
      id: 10,
      nombre: "Jugo de naranjilla",
      categoria: "Bebidas",
      descripcion: "Refresco natural de naranjilla ecuatoriana.",
      precio: 2.5,
      stock: 100,
      imagen: "https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?w=640"
    },
    {
      id: 11,
      nombre: "Humitas",
      categoria: "Snacks",
      descripcion: "Masa de choclo cocida al vapor en hoja.",
      precio: 4.5,
      stock: 50,
      imagen: "https://images.pexels.com/photos/6605935/pexels-photo-6605935.jpeg?w=640"
    },
    {
      id: 12,
      nombre: "Tres leches",
      categoria: "Postres",
      descripcion: "Bizcocho empapado en crema de tres leches.",
      precio: 5.0,
      stock: 35,
      imagen: "https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?w=640"
    }
  ];

  async function listar() {
    try {
      const response = await ApiModel.get("/productos");
      cache = response.data || [];
      return cache;
    } catch (error) {
      console.warn("Servidor inactivo. Cargando menú con tus imágenes de Pexels.", error);
      cache = menuDePrueba;
      return cache;
    }
  }

  async function obtener(id) {
    try {
      const response = await ApiModel.get("/productos/" + id);
      return response.data;
    } catch (error) {
      return cache.find(p => p.id === Number(id) || p.id === id) || null;
    }
  }

  async function crear(datos) {
    const response = await ApiModel.post("/productos", datos);
    return response.data;
  }

  async function actualizar(id, datos) {
    const response = await ApiModel.put("/productos/" + id, datos);
    return response.data;
  }

  async function eliminar(id) {
    return ApiModel.del("/productos/" + id);
  }

  function getCache() {
    return cache;
  }

  return { listar, obtener, crear, actualizar, eliminar, getCache };
})();

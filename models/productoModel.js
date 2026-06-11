const ProductoModel = (function () {
  "use strict";

  let cache = [];

  // 🔽 MENÚ DE RESPALDO: Se mostrará si el servidor está apagado
  const menuDePrueba = [
    {
      id: "mock-1",
      nombre: "Locro de Papa",
      precio: 4.50,
      categoria: "Sopas",
      imagen: "assets/images/locro.jpg", // Asegúrate de que la ruta coincida con tus fotos
      stock: 15,
      descripcion: "Tradicional sopa espesa ecuatoriana con queso fresco y aguacate."
    },
    {
      id: "mock-2",
      nombre: "Encebollado de Pescado",
      precio: 5.00,
      categoria: "Mariscos",
      imagen: "assets/images/encebollado.jpg",
      stock: 20,
      descripcion: "El clásico plato costeño con albacora, yuca y abundante cebolla."
    },
    {
      id: "mock-3",
      nombre: "Seco de Chivo",
      precio: 6.50,
      categoria: "Platos fuertes",
      imagen: "assets/images/seco.jpg",
      stock: 10,
      descripcion: "Guiso tradicional acompañado de arroz amarillo y maduro frito."
    },
    {
      id: "mock-4",
      nombre: "Humita Tradicional",
      precio: 1.75,
      categoria: "Snacks",
      imagen: "assets/images/humita.jpg",
      stock: 25,
      descripcion: "Masa de maíz tierno sazonada con queso, envuelta en hoja de choclo."
    },
    {
      id: "mock-5",
      nombre: "Colada Morada con Guagua",
      precio: 3.00,
      categoria: "Bebidas",
      imagen: "assets/images/colada.jpg",
      stock: 30,
      descripcion: "Bebida tradicional a base de maíz negro y frutas finas."
    }
  ];

  async function listar() {
    try {
      // Intenta ir por los datos reales del servidor local
      const response = await ApiModel.get("/productos");
      cache = response.data || [];
      return cache;
    } catch (error) {
      console.warn("Servidor inactivo. Cargando menú de prueba para GitHub Pages.", error);
      // Si el servidor falla, le inyectamos los platos falsos para que la página cobre vida
      cache = menuDePrueba;
      return cache;
    }
  }

  async function obtener(id) {
    try {
      const response = await ApiModel.get("/productos/" + id);
      return response.data;
    } catch (error) {
      // Si busca un plato individual estando sin servidor, lo busca en los datos falsos
      return cache.find(p => p.id === id) || null;
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

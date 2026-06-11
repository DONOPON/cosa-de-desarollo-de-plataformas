const ProductoModel = (function () {
  "use strict";

  let cache = [];

  // Menú con imágenes web reales para cuando se abra desde GitHub Pages
  const menuRespaldoWeb = [
    { id: 1, nombre: "Encebollado", categoria: "Sopas", descripcion: "Caldo de albacora con yuca, tomate y cebolla curtida.", precio: 8.5, stock: 50, imagen: "https://i.imgur.com/83pMscb.jpeg" },
    { id: 2, nombre: "Locro de papa", categoria: "Sopas", descripcion: "Sopa cremosa de papa con queso fresco y aguacate.", precio: 7.0, stock: 40, imagen: "https://i.imgur.com/B70hI2b.jpeg" },
    { id: 3, nombre: "Caldo de patas", categoria: "Sopas", descripcion: "Caldo de pata de res con maní, mote y aguacate.", precio: 7.5, stock: 35, imagen: "https://i.imgur.com/V9uR4pW.jpeg" },
    { id: 4, nombre: "Llapingachos", categoria: "Platos fuertes", descripcion: "Tortillas de papa con queso, chorizo y huevo frito.", precio: 9.5, stock: 30, imagen: "https://i.imgur.com/M6LALzQ.jpeg" },
    { id: 5, nombre: "Hornado", categoria: "Platos fuertes", descripcion: "Cerdo horneado con mote y llapingachos.", precio: 12.0, stock: 25, imagen: "https://i.imgur.com/NbyzU57.jpeg" },
    { id: 6, nombre: "Seco de pollo", categoria: "Platos fuertes", descripcion: "Pollo guisado con cerveza y naranjilla.", precio: 9.0, stock: 40, imagen: "https://i.imgur.com/8N4S87e.jpeg" },
    { id: 7, menuRespaldoWeb: true, nombre: "Ceviche de camarón", categoria: "Mariscos", descripcion: "Camarón fresco con limón y chifles.", precio: 11.0, stock: 30, imagen: "https://i.imgur.com/b2wXk6k.jpeg" },
    { id: 8, nombre: "Encocado de pescado", categoria: "Mariscos", descripcion: "Pescado en salsa de coco con especias.", precio: 13.5, stock: 20, imagen: "https://i.imgur.com/Y6K8VdC.jpeg" },
    { id: 9, nombre: "Bolón de verde", categoria: "Desayunos", descripcion: "Masa de plátano verde rellena de queso.", precio: 5.5, stock: 45, imagen: "https://i.imgur.com/rL7e66E.jpeg" },
    { id: 10, nombre: "Jugo de naranjilla", categoria: "Bebidas", descripcion: "Refresco natural de naranjilla ecuatoriana.", precio: 2.5, stock: 100, imagen: "https://i.imgur.com/XGoxgT1.jpeg" },
    { id: 11, nombre: "Humitas", categoria: "Snacks", descripcion: "Masa de choclo cocida al vapor en hoja.", precio: 4.5, stock: 50, imagen: "https://i.imgur.com/O6Sj9m1.jpeg" },
    { id: 12, nombre: "Tres leches", categoria: "Postres", descripcion: "Bizcocho empapado en crema de tres leches.", precio: 5.0, stock: 35, imagen: "https://i.imgur.com/Uf64kZy.jpeg" }
  ];

  async function listar() {
    const response = await ApiModel.get("/productos");
    
    // Si la API falló por falta de conexión, inyecta el menú de respaldo
    if (!response || response.fallback) {
      cache = menuRespaldoWeb;
    } else {
      cache = response.data || [];
    }
    return cache;
  }

  async function obtener(id) {
    const response = await ApiModel.get("/productos/" + id);
    if (!response || response.fallback) {
      return cache.find(p => p.id === Number(id) || p.id === id) || null;
    }
    return response.data;
  }

  async function crear(datos) { return datos; }
  async function actualizar(id, datos) { return datos; }
  async function eliminar(id) { return true; }
  function getCache() { return cache; }

  return { listar, obtener, crear, actualizar, eliminar, getCache };
})();

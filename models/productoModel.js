const ProductoModel = (function () {
  "use strict";

  let cache = [];

  // 🔽 MENÚ DE RESPALDO CON IMÁGENES REALES DE WIKIPEDIA
  const menuDePrueba = [
    {
      id: "mock-1",
      nombre: "Encebollado",
      categoria: "Sopas",
      descripcion: "Caldo de albacora con yuca, tomate y cebolla curtida.",
      precio: 8.5,
      stock: 50,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Encebollado.jpg/640px-Encebollado.jpg"
    },
    {
      id: "mock-2",
      nombre: "Locro de papa",
      categoria: "Sopas",
      descripcion: "Sopa cremosa de papa con queso fresco y aguacate.",
      precio: 7.0,
      stock: 40,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Locro_de_papa.jpg/640px-Locro_de_papa.jpg"
    },
    {
      id: "mock-3",
      nombre: "Caldo de patas",
      categoria: "Sopas",
      descripcion: "Caldo de pata de res con maní, mote y aguacate.",
      precio: 7.5,
      stock: 35,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Caldo_de_pata.jpg/640px-Caldo_de_pata.jpg"
    },
    {
      id: "mock-4",
      nombre: "Llapingachos",
      categoria: "Platos fuertes",
      descripcion: "Tortillas de papa con queso, chorizo y huevo frito.",
      precio: 9.5,
      stock: 30,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Llapingachos.jpg/640px-Llapingachos.jpg"
    },
    {
      id: "mock-5",
      nombre: "Hornado",
      categoria: "Platos fuertes",
      descripcion: "Cerdo horneado con mote y llapingachos.",
      precio: 12.0,
      stock: 25,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Hornado_ecuatoriano.jpg/640px-Hornado_ecuatoriano.jpg"
    },
    {
      id: "mock-6",
      nombre: "Seco de pollo",
      categoria: "Platos fuertes",
      descripcion: "Pollo guisado con cerveza y naranjilla.",
      precio: 9.0,
      stock: 40,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Seco_de_pollo.jpg/640px-Seco_de_pollo.jpg"
    },
    {
      id: "mock-7",
      nombre: "Ceviche de camarón",
      categoria: "Mariscos",
      descripcion: "Camarón fresco con limón y chifles.",
      precio: 11.0,
      stock: 30,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Ceviche_de_camaron_ecuatoriano.jpg/640px-Ceviche_de_camaron_ecuatoriano.jpg"
    },
    {
      id: "mock-8",
      nombre: "Encocado de pescado",
      categoria: "Mariscos",
      descripcion: "Pescado en salsa de coco con especias.",
      precio: 13.5,
      stock: 20,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Encocado_de_pescado.jpg/640px-Encocado_de_pescado.jpg"
    },
    {
      id: "mock-9",
      nombre: "Bolón de verde",
      categoria: "Desayunos",
      descripcion: "Masa de plátano verde rellena de queso.",
      precio: 5.5,
      stock: 45,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bolon_de_verde.jpg/640px-Bolon_de_verde.jpg"
    },
    {
      id: "mock-10",
      nombre: "Jugo de naranjilla",
      categoria: "Bebidas",
      descripcion: "Refresco natural de naranjilla ecuatoriana.",
      precio: 2.5,
      stock: 100,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Naranjilla_juice.jpg/640px-Naranjilla_juice.jpg"
    },
    {
      id: "mock-11",
      nombre: "Humitas",
      categoria: "Snacks",
      descripcion: "Masa de choclo cocida al vapor en hoja.",
      precio: 4.5,
      stock: 50,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Humitas_ecuatorianas.jpg/640px-Humitas_ecuatorianas.jpg"
    },
    {
      id: "mock-12",
      nombre: "Tres leches",
      categoria: "Postres",
      descripcion: "Bizcocho empapado en crema de tres leches.",
      precio: 5.0,
      stock: 35,
      imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Tres_leches_cake.jpg/640px-Tres_leches_cake.jpg"
    }
  ];

  async function listar() {
    try {
      const response = await ApiModel.get("/productos");
      cache = response.data || [];
      return cache;
    } catch (error) {
      console.warn("Servidor inactivo. Cargando menú con imágenes de Wikipedia para GitHub Pages.", error);
      cache = menuDePrueba;
      return cache;
    }
  }

  async function obtener(id) {
    try {
      const response = await ApiModel.get("/productos/" + id);
      return response.data;
    } catch (error) {
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

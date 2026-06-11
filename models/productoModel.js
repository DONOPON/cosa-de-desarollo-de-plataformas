const ProductoModel = (function () {
  "use strict";

  let cache = [];

  // 🔽 MENÚ DE RESPALDO CON TUS NUEVOS LINKS ACTUALIZADOS
  const menuDePrueba = [
    {
      id: 1,
      nombre: "Encebollado",
      categoria: "Sopas",
      descripcion: "Caldo de albacora con yuca, tomate y cebolla curtida.",
      precio: 8.5,
      stock: 50,
      imagen: "https://storage.googleapis.com/fitia_recipe_images/EC-R-V-00000007%2Fv4%2Frect.jpeg"
    },
    {
      id: 2,
      nombre: "Locro de papa",
      categoria: "Sopas",
      descripcion: "Sopa cremosa de papa con queso fresco y aguacate.",
      precio: 7.0,
      stock: 40,
      imagen: "https://sabor.eluniverso.com/wp-content/uploads/2024/10/OTRA-FOTO-DE-LOCRO-DE-PAPAS-DE-CARLOS-VILLACIS-PARA-REEMPLAZAR-EN-EL-PAPEL.jpg" // 🌟 Actualizado
    },
    {
      id: 3,
      nombre: "Caldo de patas",
      categoria: "Sopas",
      descripcion: "Caldo de pata de res con maní, mote y aguacate.",
      precio: 7.5,
      stock: 35,
      imagen: "https://rastro.quito.gob.ec/wp-content/uploads/2024/07/CaldoDePatas-1024x683.png" // 🌟 Actualizado
    },
    {
      id: 4,
      nombre: "Llapingachos",
      categoria: "Platos fuertes",
      descripcion: "Tortillas de papa con queso, chorizo y huevo frito.",
      precio: 9.5,
      stock: 30,
      imagen: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/e6d7bea8148db1d925409b9fa3b8368f.jpg" // 🌟 Actualizado
    },
    {
      id: 5,
      nombre: "Hornado",
      categoria: "Platos fuertes",
      descripcion: "Cerdo horneado con mote y llapingachos.",
      precio: 12.0,
      stock: 25,
      imagen: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/144ff6fad3865ecc6d5d5d3a0daacd06.jpg" // 🌟 Actualizado
    },
    {
      id: 6,
      nombre: "Seco de pollo",
      categoria: "Platos fuertes",
      descripcion: "Pollo guisado con cerveza y naranjilla.",
      precio: 9.0,
      stock: 40,
      imagen: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 7,
      nombre: "Ceviche de camarón",
      categoria: "Mariscos",
      descripcion: "Camarón fresco con limón y chifles.",
      precio: 11.0,
      stock: 30,
      imagen: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 8,
      nombre: "Encocado de pescado",
      categoria: "Mariscos",
      descripcion: "Pescado en salsa de coco con especias.",
      precio: 13.5,
      stock: 20,
      imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 9,
      nombre: "Bolón de verde",
      categoria: "Desayunos",
      descripcion: "Masa de plátano verde rellena de queso.",
      precio: 5.5,
      stock: 45,
      imagen: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 10,
      nombre: "Jugo de naranjilla",
      categoria: "Bebidas",
      descripcion: "Refresco natural de naranjilla ecuatoriana.",
      precio: 2.5,
      stock: 100,
      imagen: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 11,
      nombre: "Humitas",
      categoria: "Snacks",
      descripcion: "Masa de choclo cocida al vapor en hoja.",
      precio: 4.5,
      stock: 50,
      imagen: "https://images.unsplash.com/photo-1562158074-27ff1e9014b0?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 12,
      nombre: "Tres leches",
      categoria: "Postres",
      descripcion: "Bizcocho empapado en crema de tres leches.",
      precio: 5.0,
      stock: 35,
      imagen: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80"
    }
  ];

  async function listar() {
    try {
      const response = await ApiModel.get("/productos");
      cache = response.data || [];
      return cache;
    } catch (error) {
      console.warn("Servidor inactivo. Cargando menú con imágenes reales fijas.", error);
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

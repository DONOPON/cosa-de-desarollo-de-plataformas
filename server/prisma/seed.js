const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const productos = [
  {
    nombre: "Encebollado",
    categoria: "Sopas",
    descripcion: "Caldo de albacora con yuca, tomate y cebolla curtida.",
    precio: 8.5,
    stock: 50,
    imagen: "/images/encebollado.jpg"
  },
  {
    nombre: "Locro de papa",
    categoria: "Sopas",
    descripcion: "Sopa cremosa de papa con queso fresco y aguacate.",
    precio: 7.0,
    stock: 40,
    imagen: "/images/locro-de-papa.jpg"
  },
  {
    nombre: "Caldo de patas",
    categoria: "Sopas",
    descripcion: "Caldo de pata de res con maní, mote y aguacate.",
    precio: 7.5,
    stock: 35,
    imagen: "/images/caldo-de-patas.jpg"
  },
  {
    nombre: "Llapingachos",
    categoria: "Platos fuertes",
    descripcion: "Tortillas de papa con queso, chorizo y huevo frito.",
    precio: 9.5,
    stock: 30,
    imagen: "/images/llapingachos.jpg"
  },
  {
    nombre: "Hornado",
    categoria: "Platos fuertes",
    descripcion: "Cerdo horneado con mote y llapingachos.",
    precio: 12.0,
    stock: 25,
    imagen: "/images/hornado.jpg"
  },
  {
    nombre: "Seco de pollo",
    categoria: "Platos fuertes",
    descripcion: "Pollo guisado con cerveza y naranjilla.",
    precio: 9.0,
    stock: 40,
    imagen: "/images/seco-de-pollo.jpg"
  },
  {
    nombre: "Ceviche de camarón",
    categoria: "Mariscos",
    descripcion: "Camarón fresco con limón y chifles.",
    precio: 11.0,
    stock: 30,
    imagen: "/images/ceviche-de-camaron.jpg"
  },
  {
    nombre: "Encocado de pescado",
    categoria: "Mariscos",
    descripcion: "Pescado en salsa de coco con especias.",
    precio: 13.5,
    stock: 20,
    imagen: "/images/encocado-de-pescado.jpg"
  },
  {
    nombre: "Bolón de verde",
    categoria: "Desayunos",
    descripcion: "Masa de plátano verde rellena de queso.",
    precio: 5.5,
    stock: 45,
    imagen: "/images/bolon-de-verde.jpg"
  },
  {
    nombre: "Jugo de naranjilla",
    categoria: "Bebidas",
    descripcion: "Refresco natural de naranjilla ecuatoriana.",
    precio: 2.5,
    stock: 100,
    imagen: "/images/jugo-de-naranjilla.jpg"
  },
  {
    nombre: "Humitas",
    categoria: "Snacks",
    descripcion: "Masa de choclo cocida al vapor en hoja.",
    precio: 4.5,
    stock: 50,
    imagen: "/images/humitas.jpg"
  },
  {
    nombre: "Tres leches",
    categoria: "Postres",
    descripcion: "Bizcocho empapado en crema de tres leches.",
    precio: 5.0,
    stock: 35,
    imagen: "/images/tres-leches.jpg"
  }
];

async function main() {
  const adminHash = await bcrypt.hash("Admin123!", 12);
  const userHash = await bcrypt.hash("User12345", 12);

  await prisma.usuario.upsert({
    where: { email: "admin@saborecuatoriano.ec" },
    update: {},
    create: {
      username: "admin",
      email: "admin@saborecuatoriano.ec",
      passwordHash: adminHash,
      role: "admin"
    }
  });

  await prisma.usuario.upsert({
    where: { email: "user@saborecuatoriano.ec" },
    update: {},
    create: {
      username: "usuario",
      email: "user@saborecuatoriano.ec",
      passwordHash: userHash,
      role: "user"
    }
  });
  
  await prisma.producto.deleteMany({});
  await prisma.producto.createMany({ data: productos });

  console.log("Seed completado: 12 productos con imágenes locales vinculadas correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

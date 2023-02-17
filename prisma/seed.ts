import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17201',
      name: 'Uramaki Ebiten',
      price: 35,
      description: 'Sushi uramaki with tempura shrimp',
      img: 'test/test.jpg'
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e001',
      name: 'Futomaki Philadelphia',
      price: 32,
      description: 'Sushi futomaki with raw salmon',
      img: 'test/test.jpg'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17202',
      name: 'Uramaki California',
      price: 30,
      description: 'Sushi uramaki with surimi sticks',
      img: 'test/test.jpg'
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17203',
      name: 'Futomaki Maguro',
      price: 41,
      description: 'Sushi futomaki with raw tuna',
      img: 'test/test.jpg'
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a203',
      name: 'Hosomaki Kappa',
      price: 25,
      description: 'Sushi hosomaki with cucumber',
      img: 'test/test.jpg'
    },
  ];
}

function getIngredients() {
  return [
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17201",
      name: "shrimp",
      amount: 30
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17201",
      name: "cucumber",
      amount: 15
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17201",
      name: "mayonaise",
      amount: 2
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17201",
      name: "oshinko",
      amount: 15
    },
    {
      productId: "c920c7b9-a67d-4edb-8ce7-e3c9f3889e001",
      name: "salmon",
      amount: 55
    },
    {
      productId: "c920c7b9-a67d-4edb-8ce7-e3c9f3889e001",
      name: "avocado",
      amount: 15
    },
    {
      productId: "c920c7b9-a67d-4edb-8ce7-e3c9f3889e001",
      name: "cream sushi cheese",
      amount: 5
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17202",
      name: "surimi sticks",
      amount: 25
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17202",
      name: "cucumber",
      amount: 25
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17203",
      name: "raw tuna",
      amount: 55
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17203",
      name: "oshinko",
      amount: 15
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17203",
      name: "cucumber",
      amount: 15
    },
    {
      productId: "fd105551-0f0d-4a9f-bc41-c559c8a17203",
      name: "sriracha",
      amount: 55
    },
    {
      productId: "01c7599d-318b-4b9f-baf7-51f3a936a203",
      name: "cucumber",
      amount: 40
    },
  ]
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getIngredients().map((ingredient) => {
      return db.ingredient.create({ data: ingredient })
    })
  )
}

seed();
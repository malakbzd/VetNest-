const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");
const Article = require("./models/Article");
const Pet = require("./models/Pet");
const Appointment = require("./models/Appointment");

const connectDB = require("./config/db");

// 6 products
const products = [
  { name: "Premium Dog Food", category: "food", price: 29.99, stock: 50, forAnimal: "dog", description: "Grain‑free with real chicken", image: "https://images.unsplash.com/photo-1565707831246-3c28b6e5b5f9?w=300" },
  { name: "Organic Cat Treats", category: "food", price: 12.99, stock: 100, forAnimal: "cat", description: "Salmon flavored", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300" },
  { name: "Chew Toy Bundle", category: "toys", price: 19.99, stock: 80, forAnimal: "dog", description: "Durable rubber toys", image: "https://images.unsplash.com/photo-1542567459-cd5d7b2b3b2a?w=300" },
  { name: "Cat Scratching Post", category: "accessories", price: 34.99, stock: 40, forAnimal: "cat", description: "Sisal post", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=300" },
  { name: "Pet Grooming Kit", category: "grooming", price: 45.99, stock: 25, forAnimal: "all", description: "Complete set", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300" },
  { name: "Vet Flea Treatment", category: "medicine", price: 24.99, stock: 30, forAnimal: "all", description: "Monthly prevention", image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=300" }
];

// 5 articles
const articles = [
  {
    title: "How to Treat Your Dog's Anxiety",
    category: "behavior",
    content: "Dogs can experience anxiety just like humans. Common signs include excessive barking, destructive behavior, and hiding. To help your anxious dog: 1) Create a safe space, 2) Use positive reinforcement, 3) Consider calming supplements, 4) Consult your vet for severe cases. Regular exercise and mental stimulation also help reduce anxiety levels.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400"
  },
  {
    title: "Best Cat Food Brands for 2024",
    category: "nutrition",
    content: "Choosing the right cat food is essential for your feline's health. Top brands include: 1) Royal Canin – great for breed‑specific needs, 2) Hill's Science Diet – vet recommended, 3) Blue Buffalo – natural ingredients, 4) Wellness Core – grain‑free options. Always check that the first ingredient is real meat and avoid foods with excessive fillers.",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400"
  },
  {
    title: "Understanding Your Bird's Body Language",
    category: "behavior",
    content: "Birds communicate through body language. Fluffed feathers can mean relaxation or illness. Tail wagging often indicates happiness. Beak grinding means contentment. If your bird is hissing or pinning its eyes, it may feel threatened. Learning these signs helps build a stronger bond with your feathered friend.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400"
  },
  {
    title: "Fish Tank Maintenance Guide",
    category: "health",
    content: "Proper aquarium maintenance is crucial for fish health. Perform 25% water changes weekly. Test water parameters regularly (pH, ammonia, nitrite, nitrate). Clean filters monthly but never with tap water – use tank water to preserve beneficial bacteria. Avoid overfeeding, which can cause ammonia spikes.",
    image: "https://images.unsplash.com/photo-1519125328138-6f3cd3ffd6b2?w=400"
  },
  {
    title: "How to Introduce a New Cat to Your Dog",
    category: "behavior",
    content: "Introducing a new cat to a resident dog requires patience. Start with separation – keep them in different rooms. Swap scents using blankets. Allow visual contact through a baby gate. Gradually increase supervised interactions. Reward calm behavior. Never force interaction. This process can take weeks to months.",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear collections
    await User.deleteMany();
    await Product.deleteMany();
    await Article.deleteMany();
    await Pet.deleteMany();
    await Appointment.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@vetnest.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin"
    });

    // Insert products
    await Product.insertMany(products);

    // Insert articles with author
    const articlesWithAuthor = articles.map(article => ({
      ...article,
      author: admin._id
    }));
    await Article.insertMany(articlesWithAuthor);

    console.log("✅ Database seeded!");
    console.log("Admin created: admin@vetnest.com / admin123");
    console.log(`Products: ${products.length}, Articles: ${articles.length}`);
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
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
{ name: "Dry Puppy Food", category: "food", price: 22.99, stock: 60, forAnimal: "dog", description: "Rich in protein for puppies",image :"https://i.pinimg.com/1200x/64/47/01/644701bb0721ce0f50a62b3b1125f17f.jpg"  },

{ name: "Cat Wet Food Pack", category: "food", price: 18.50, stock: 70, forAnimal: "cat", description: "Mixed flavors", image: "https://i.pinimg.com/736x/7d/83/29/7d83296e9d8b713bdcdeff936bd2dda5.jpg" },

{ name: "Dog Leash", category: "accessories", price: 14.99, stock: 90, forAnimal: "dog", description: "Strong and durable leash", image: "https://i.pinimg.com/1200x/34/bb/ef/34bbef791804c2e81f84eb831c48e0a8.jpg" },

{ name: "Cat Collar Bell", category: "accessories", price: 9.99, stock: 120, forAnimal: "cat", description: "Colorful with bell", image: "https://i.pinimg.com/736x/a6/83/4f/a6834feb92ce3d42add033732ace6f49.jpg" },

{ name: "Bird Cage", category: "accessories", price: 59.99, stock: 20, forAnimal: "bird", description: "Spacious metal cage", image: "https://i.pinimg.com/736x/0e/db/82/0edb821444aad13d0aa2af8ac23d4e83.jpg" },

{ name: "Fish Tank Filter", category: "maintenance", price: 27.99, stock: 35, forAnimal: "fish", description: "Keeps water clean", image: "https://i.pinimg.com/736x/6d/ea/ea/6deaeabe0e0e9b0adb24a9b996979248.jpg" },

{ name: "Hamster Wheel", category: "toys", price: 11.99, stock: 75, forAnimal: "small", description: "Silent spinning wheel", image: "https://i.pinimg.com/736x/e4/95/dd/e495dd0703876be80e010a989004dcaf.jpg" },

{ name: "Dog Bed Deluxe", category: "accessories", price: 49.99, stock: 30, forAnimal: "dog", description: "Soft and comfortable", image: "https://i.pinimg.com/736x/0b/e9/66/0be966f4d547b1ace243b92036edaaeb.jpg" },

{ name: "Cat Tunnel Toy", category: "toys", price: 21.99, stock: 55, forAnimal: "cat", description: "Fun hide and play tunnel", image: "https://i.pinimg.com/1200x/45/7a/b0/457ab07964275b4eed542933436d8256.jpg" },

{ name: "Pet Shampoo", category: "grooming", price: 13.99, stock: 65, forAnimal: "all", description: "Gentle skin formula", image: "https://i.pinimg.com/736x/c0/9c/b3/c09cb373690fccff18feb33aa5644440.jpg" },

{ name: "Dog Training Pads", category: "training", price: 17.99, stock: 85, forAnimal: "dog", description: "Absorbent pads", image: "https://i.pinimg.com/1200x/33/dc/a3/33dca302360f5b59c07603b14e56c904.jpg" },

{ name: "Cat Litter Box", category: "accessories", price: 26.99, stock: 45, forAnimal: "cat", description: "Easy to clean", image: "https://i.pinimg.com/1200x/7c/74/7b/7c747b76988aa669f53bcf8e1c2deac3.jpg" },

{ name: "Aquarium Heater", category: "maintenance", price: 32.99, stock: 28, forAnimal: "fish", description: "Maintains water temperature", image: "https://i.pinimg.com/736x/dd/58/7e/dd587ef72f515445696a4d21777bdbf4.jpg" },

{ name: "Dog Dental Chews", category: "health", price: 15.99, stock: 70, forAnimal: "dog", description: "Supports oral health", image: "https://i.pinimg.com/1200x/16/07/e0/1607e03a0f863cf8220ef91f39e8209a.jpg" },

{ name: "Catnip Toy Set", category: "toys", price: 10.99, stock: 95, forAnimal: "cat", description: "Infused with catnip", image: "https://i.pinimg.com/1200x/46/d8/a2/46d8a2987db8cc4401240732c8eb5bfa.jpg" },

{ name: "Pet Travel Carrier", category: "accessories", price: 39.99, stock: 33, forAnimal: "all", description: "Portable and safe", image: "https://i.pinimg.com/736x/75/60/4d/75604dc7ef08b877fb05e6b7e8bbef15.jpg" },

{ name: "Rabbit Hay Pack", category: "food", price: 16.99, stock: 50, forAnimal: "rabbit", description: "Fresh natural hay", image: "https://i.pinimg.com/1200x/9b/29/0c/9b290cb357abe34dc36bb42b755d175b.jpg" },

{ name: "Pet Nail Clipper", category: "grooming", price: 8.99, stock: 110, forAnimal: "all", description: "Safe trimming tool", image: "https://i.pinimg.com/1200x/f3/80/fb/f380fb4ff44f7c2f85b2a0a52d712a58.jpg" },

{ name: "Dog Rain Coat", category: "accessories", price: 23.99, stock: 40, forAnimal: "dog", description: "Waterproof jacket", image: "https://i.pinimg.com/1200x/fc/4c/9f/fc4c9f61bc89e20981afe54dbfbcecbb.jpg" },

{ name: "Bird Food Mix", category: "food", price: 14.49, stock: 60, forAnimal: "bird", description: "Seeds and grains mix", image: "https://i.pinimg.com/1200x/8c/dd/41/8cdd413ed2a2a56afa174e21fffc9c0b.jpg" }
];

// 5 articles
const articles = [
  {
    title: "How to Treat Your Dog's Anxiety",
    category: "behavior",
    content: "Dogs can experience anxiety just like humans. Common signs include excessive barking, destructive behavior, and hiding. To help your anxious dog: 1) Create a safe space, 2) Use positive reinforcement, 3) Consider calming supplements, 4) Consult your vet for severe cases. Regular exercise and mental stimulation also help reduce anxiety levels.",
    image: "https://i.pinimg.com/1200x/1f/f4/c9/1ff4c91a7bafa00cc81bb1e22bfc0f92.jpg",
    link : "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/anxious-behavior-how-help-your-dog-cope-unsettling-situations"
  },
  {
    title: "Best Cat Food Brands for 2026",
    category: "nutrition",
    content: "Choosing the right cat food is essential for your feline's health. Top brands include: 1) Royal Canin – great for breed‑specific needs, 2) Hill's Science Diet – vet recommended, 3) Blue Buffalo – natural ingredients, 4) Wellness Core – grain‑free options. Always check that the first ingredient is real meat and avoid foods with excessive fillers.",
    image: "https://i.pinimg.com/1200x/cd/b3/85/cdb385751bbe72bdb7d6542787740614.jpg",
    link :"https://cats.com/best-cat-food"
  },
  {
    title: "Understanding Your Bird's Body Language",
    category: "behavior",
    content: "Birds communicate through body language. Fluffed feathers can mean relaxation or illness. Tail wagging often indicates happiness. Beak grinding means contentment. If your bird is hissing or pinning its eyes, it may feel threatened. Learning these signs helps build a stronger bond with your feathered friend.",
    image: "https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/04124345/bird-body-language-head-bobbing.avif",
    link : "https://www.scribd.com/document/168794542/Body-Language-of-Birds"
  },
  {
    title: "Fish Tank Maintenance Guide",
    category: "health",
    content: "Proper aquarium maintenance is crucial for fish health. Perform 25% water changes weekly. Test water parameters regularly (pH, ammonia, nitrite, nitrate). Clean filters monthly but never with tap water – use tank water to preserve beneficial bacteria. Avoid overfeeding, which can cause ammonia spikes.",
    image: "https://i.pinimg.com/736x/66/d1/94/66d19416670529785ffd3073aacb8d2f.jpg",
    link : "https://aquashack.com/planted-tank-maintenance/"
  },
  {
    title: "How to Introduce a New Cat to Your Dog",
    category: "behavior",
    content: "Introducing a new cat to a resident dog requires patience. Start with separation – keep them in different rooms. Swap scents using blankets. Allow visual contact through a baby gate. Gradually increase supervised interactions. Reward calm behavior. Never force interaction. This process can take weeks to months.",
    image: "https://images.ctfassets.net/8hq8guzcncfs/1VgICWU8WcJKAlH0fgAEMi/d024f5fb6fe3bc12d759b4097c6c6700/How_Many_Hours_of_Sleep_Do_Dogs_and_Cats_Need.jpg?fm=webp&w=1193",
    link: "https://bestfriends.org/pet-care-resources/how-introduce-dog-cat"
  },
  {
  title: "Keeping Your Cat Active Indoors",
  category: "lifestyle",
  content: "Indoor cats need stimulation to stay healthy. Provide toys like balls, feathers, and laser pointers. Create vertical spaces such as shelves or cat trees. Play with your cat daily to prevent boredom. Rotate toys to keep them interesting. Mental and physical activity helps prevent obesity.",
  image: "https://www.agria.ie/.netlify/images?w=932&h=462&fit=cover&position=center&fm=avif&q=75&url=https%3A%2F%2Fagria.uksouth01.umbraco.io%2Fmedia%2Fjyuhyhtx%2Fscreenshot-2025-01-10-124241.png%3Fwidth%3D932%26quality%3D80&cd=ea44fbc969def93ab70bcf4243fa80f1",
  link: "https://www.agria.ie/guides-and-advice/tips-for-keeping-your-indoor-cat-active/"
}
,
  {
  title: "How to Groom Your Rabbit",
  category: "grooming",
  content: "Rabbits need regular grooming to stay clean and healthy. Brush their fur weekly to remove loose hair. Check their nails and trim them carefully when needed. Keep their living area clean to prevent infections. Avoid bathing rabbits unless necessary, as it can stress them.",
  image: "https://www.fayettevilleveterinary.com/wp-content/uploads/e-33.jpg",
  link: "https://www.fayettevilleveterinary.com/2018/07/15/grooming-your-bunny/"
}
,
  {
  title: "Signs Your Dog is Sick",
  category: "health",
  content: "Pets often hide illness, so watch for warning signs. Changes in appetite, energy, or behavior can indicate a problem. Vomiting, diarrhea, or unusual weight loss are also serious signs. If your pet shows any of these symptoms, consult a veterinarian as soon as possible.",
  image: "https://brownvethospital.com/wp-content/uploads/2023/09/sick-dog-signs-1536x788.jpg",
  link: "https://brownvethospital.com/blog/10-signs-your-dog-is-sick/"
}
,
  {
  title: "How to Travel with Your Pet",
  category: "lifestyle",
  content: "Traveling with pets requires preparation. Use a secure carrier or harness. Bring food, water, and familiar items like toys or blankets. Take breaks during long trips. Make sure your pet is comfortable and not stressed. Always check travel regulations before your trip.",
  image: "https://www.whycatwhy.com/wp-content/uploads/2016/05/cat-in-a-suitcase.jpg",
  link: "https://www.nationalgeographic.com/travel/article/traveling-with-pets-tips#:~:text=Determine%20when%20to%20travel%20without,tend%20to%20book%20up%20quickly.)"
}
,
  {
  title: "How to Train Your Cat to Use a Litter Box",
  category: "training",
  content: "Most cats learn quickly to use a litter box. Place it in a quiet, accessible location. Keep it clean at all times. If your cat has accidents, avoid punishment and instead guide it gently. Consistency and cleanliness are key to successful training.",
  image: "https://www.whiskas.me/cdn-cgi/image/height=617,f=auto,quality=90/sites/g/files/fnmzdf5016/files/2024-04/how-to-large_1649757517102.jpg",
  link: "https://www.humaneworld.org/en/resources/how-litter-train-kitten-or-cat"
}
,
  {
  title: "Preventing Fleas and Ticks",
  category: "health",
  content: "Fleas and ticks can harm your pet's health. Use veterinarian-approved treatments regularly. Keep your home and pet bedding clean. Check your pet's fur after outdoor activities. Prevention is easier than treatment and protects your pet from diseases.",
  image: "https://pet-health-content-media.chewy.com/wp-content/uploads/2026/03/12133227/dog-playing-outside-1024x683.jpg?w=2048&q=75",
  link: "https://www.petmd.com/dog/general-health/flea-and-tick-prevention-and-treatment-dogs"
}
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // ✅ Check if admin exists
    let admin = await User.findOne({ email: "admin@vetnest.com" });

    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: "admin@vetnest.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin"
      });
      console.log("✅ Admin created");
    } else {
      console.log("ℹ️ Admin already exists");
    }

    // ✅ Insert products only if not exist
    for (let product of products) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) {
        await Product.create(product);
      }
    }

    // ✅ Insert articles only if not exist
    for (let article of articles) {
      const exists = await Article.findOne({ title: article.title });
      if (!exists) {
        await Article.create({
          ...article,
          author: admin._id
        });
      }
    }

    console.log("✅ Seeding completed");
    process.exit();

  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};


seedDatabase();
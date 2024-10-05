const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dummyRecipes = [
  {
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    ingredients: ["spaghetti", "eggs", "pecorino cheese", "guanciale", "black pepper"],
    instructions: [
      "Cook spaghetti in salted water.",
      "Fry guanciale until crispy.",
      "Mix eggs, cheese, and pepper in a bowl.",
      "Toss hot pasta with egg mixture and guanciale.",
      "Serve immediately with extra cheese and pepper."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Avocado Toast",
    description: "A simple and nutritious breakfast.",
    ingredients: ["bread", "avocado", "salt", "pepper", "red pepper flakes"],
    instructions: [
      "Toast bread until golden brown.",
      "Mash avocado and spread on toast.",
      "Season with salt, pepper, and red pepper flakes.",
      "Optionally, add toppings like eggs or tomatoes."
    ],
    prepTime: "5 minutes",
    cookTime: "5 minutes",
    servings: 1,
    difficulty: "Easy",
    category: "Breakfast",
    color: "bg-green-400",
    featured: true
  },
  {
    title: "Chicken Stir Fry",
    description: "A quick and healthy weeknight dinner.",
    ingredients: ["chicken breast", "mixed vegetables", "soy sauce", "ginger", "garlic", "oil"],
    instructions: [
      "Cut chicken into bite-sized pieces.",
      "Heat oil in a wok or large frying pan.",
      "Stir fry chicken until golden.",
      "Add vegetables and stir fry until tender-crisp.",
      "Add soy sauce, ginger, and garlic. Stir to combine.",
      "Serve hot over rice or noodles."
    ],
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Greek Salad",
    description: "A refreshing Mediterranean salad.",
    ingredients: ["cucumber", "tomatoes", "red onion", "feta cheese", "olives", "olive oil", "lemon juice", "oregano"],
    instructions: [
      "Chop cucumber, tomatoes, and red onion.",
      "Combine vegetables in a bowl.",
      "Add crumbled feta cheese and olives.",
      "Drizzle with olive oil and lemon juice.",
      "Sprinkle oregano and toss to combine.",
      "Chill before serving."
    ],
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "Easy",
    category: "Lunch",
    color: "bg-yellow-400",
    featured: true
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies that are crispy on the outside and chewy on the inside.",
    ingredients: ["flour", "butter", "brown sugar", "white sugar", "eggs", "vanilla extract", "baking soda", "salt", "chocolate chips"],
    instructions: [
      "Cream together butter and sugars.",
      "Beat in eggs and vanilla.",
      "Mix in dry ingredients.",
      "Fold in chocolate chips.",
      "Drop spoonfuls onto a baking sheet.",
      "Bake at 375°F (190°C) for 9-11 minutes."
    ],
    prepTime: "15 minutes",
    cookTime: "10 minutes",
    servings: 24,
    difficulty: "Easy",
    category: "Breakfast",
    color: "bg-green-400",
    featured: true
  },
  {
    title: "Vegetable Soup",
    description: "A hearty and healthy soup packed with vegetables.",
    ingredients: ["onion", "carrots", "celery", "potatoes", "tomatoes", "vegetable broth", "garlic", "herbs", "salt", "pepper"],
    instructions: [
      "Chop all vegetables.",
      "Sauté onion, carrots, and celery in a large pot.",
      "Add remaining vegetables and broth.",
      "Bring to a boil, then simmer until vegetables are tender.",
      "Season with herbs, salt, and pepper.",
      "Serve hot."
    ],
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 6,
    difficulty: "Easy",
    category: "Lunch",
    color: "bg-yellow-400",
    featured: true
  },
  {
    title: "Beef Tacos",
    description: "Delicious and easy homemade tacos.",
    ingredients: ["ground beef", "taco seasoning", "tortillas", "lettuce", "tomatoes", "cheese", "sour cream", "salsa"],
    instructions: [
      "Brown ground beef in a skillet.",
      "Add taco seasoning and water, simmer until thickened.",
      "Warm tortillas.",
      "Assemble tacos with beef and desired toppings."
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    servings: 4,
    difficulty: "Easy",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Banana Smoothie",
    description: "A creamy and nutritious breakfast smoothie.",
    ingredients: ["bananas", "milk", "yogurt", "honey", "ice"],
    instructions: [
      "Peel and slice bananas.",
      "Add all ingredients to a blender.",
      "Blend until smooth.",
      "Pour into glasses and serve immediately."
    ],
    prepTime: "5 minutes",
    cookTime: "0 minutes",
    servings: 2,
    difficulty: "Easy",
    category: "Breakfast",
    color: "bg-green-400",
    featured: true
  },
  {
    title: "Grilled Salmon",
    description: "Healthy and flavorful grilled salmon with lemon and herbs.",
    ingredients: ["salmon fillets", "lemon", "olive oil", "garlic", "dill", "salt", "pepper"],
    instructions: [
      "Mix olive oil, lemon juice, garlic, and herbs.",
      "Marinate salmon in the mixture for 30 minutes.",
      "Preheat grill to medium-high heat.",
      "Grill salmon for 4-5 minutes per side.",
      "Serve with lemon wedges."
    ],
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Caprese Salad",
    description: "A simple Italian salad with fresh mozzarella, tomatoes, and basil.",
    ingredients: ["fresh mozzarella", "tomatoes", "fresh basil leaves", "olive oil", "balsamic vinegar", "salt", "pepper"],
    instructions: [
      "Slice mozzarella and tomatoes.",
      "Arrange alternating slices of mozzarella, tomatoes, and basil leaves on a plate.",
      "Drizzle with olive oil and balsamic vinegar.",
      "Season with salt and pepper.",
      "Serve immediately."
    ],
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    servings: 4,
    difficulty: "Easy",
    category: "Lunch",
    color: "bg-yellow-400",
    featured: true
  },
  {
    title: "Mushroom Risotto",
    description: "Creamy Italian rice dish with mushrooms.",
    ingredients: ["arborio rice", "mushrooms", "onion", "white wine", "vegetable broth", "parmesan cheese", "butter"],
    instructions: [
      "Sauté mushrooms and onions.",
      "Add rice and toast briefly.",
      "Add wine and stir until absorbed.",
      "Gradually add broth, stirring constantly.",
      "Finish with parmesan and butter."
    ],
    prepTime: "10 minutes",
    cookTime: "30 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Berry Smoothie Bowl",
    description: "Thick smoothie topped with fresh fruits and granola.",
    ingredients: ["mixed berries", "banana", "Greek yogurt", "almond milk", "honey", "granola", "chia seeds"],
    instructions: [
      "Blend berries, banana, yogurt, and milk.",
      "Pour into a bowl.",
      "Top with fresh berries, granola, and chia seeds.",
      "Drizzle with honey."
    ],
    prepTime: "10 minutes",
    cookTime: "0 minutes",
    servings: 1,
    difficulty: "Easy",
    category: "Breakfast",
    color: "bg-green-400",
    featured: true
  },
  {
    title: "Lemon Garlic Roast Chicken",
    description: "Juicy roasted chicken with lemon and garlic.",
    ingredients: ["whole chicken", "lemon", "garlic", "rosemary", "olive oil", "salt", "pepper"],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Stuff chicken with lemon and garlic.",
      "Rub with oil, salt, pepper, and rosemary.",
      "Roast for 1 hour or until done.",
      "Rest before carving."
    ],
    prepTime: "15 minutes",
    cookTime: "60 minutes",
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    color: "bg-blue-400",
    featured: true
  },
  {
    title: "Pancakes",
    description: "Fluffy pancakes served with syrup.",
    ingredients: ["flour", "milk", "eggs", "baking powder", "sugar", "butter"],
    instructions: [
      "Mix dry ingredients in a bowl.",
      "In another bowl, whisk wet ingredients.",
      "Combine both mixtures and stir until smooth.",
      "Pour batter onto a hot griddle and cook until bubbles form.",
      "Flip and cook until golden brown."
    ],
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    servings: 4,
    difficulty: "Easy",
    category: "Breakfast",
    color: "bg-green-400",
    featured: true
  },
  {
    title: "Caesar Salad",
    description: "Classic Caesar salad with romaine lettuce, croutons, and Caesar dressing.",
    ingredients: ["romaine lettuce", "croutons", "Caesar dressing"],
    instructions: [
      "Wash and tear lettuce into bite-sized pieces.",
      "Place lettuce in a large bowl.",
      "Add croutons and dressing.",
      "Toss to combine.",
      "Serve immediately."
    ],
    prepTime: "5 minutes",
    cookTime: "0 minutes",
    servings: 2,
    difficulty: "Easy",
    category: "Lunch",
    color: "bg-yellow-400",
    featured: true
  }
];

async function populateDb() {
  // Clear existing recipes
  const recipesRef = db.collection('recipes');
  const snapshot = await recipesRef.get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log('Existing recipes cleared');

  // Add new recipes
  for (const recipe of dummyRecipes) {
    try {
      // Ensure all required fields are present
      const requiredFields = ['title', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings', 'difficulty', 'category', 'color', 'featured'];
      const missingFields = requiredFields.filter(field => !recipe[field]);
      
      if (missingFields.length > 0) {
        console.error(`Skipping recipe "${recipe.title}" due to missing fields: ${missingFields.join(', ')}`);
        continue;
      }

      // Additional type checks
      if (!Array.isArray(recipe.ingredients) || !Array.isArray(recipe.instructions)) {
        console.error(`Skipping recipe "${recipe.title}" due to invalid ingredients or instructions`);
        continue;
      }

      if (typeof recipe.servings !== 'number' || typeof recipe.featured !== 'boolean') {
        console.error(`Skipping recipe "${recipe.title}" due to invalid servings or featured field`);
        continue;
      }

      const docRef = await db.collection('recipes').add(recipe);
      console.log(`Added recipe: ${recipe.title} with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding recipe ${recipe.title}:`, error);
    }
  }
  
  // Verify the number of recipes added
  const newSnapshot = await recipesRef.get();
  console.log(`Total recipes in database: ${newSnapshot.size}`);
  
  console.log('Database population completed');
}

populateDb().then(() => process.exit());
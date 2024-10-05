import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  category: string;
  color: string;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipesCol = collection(db, 'recipes');
    const recipeSnapshot = await getDocs(recipesCol);
    const recipes = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
    console.log(`Fetched ${recipes.length} recipes`); // Add this line
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const recipeDoc = doc(db, 'recipes', id);
  const recipeSnapshot = await getDoc(recipeDoc);
  if (recipeSnapshot.exists()) {
    return { id: recipeSnapshot.id, ...recipeSnapshot.data() } as Recipe;
  }
  return null;
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  console.log(`Fetching recipes for category: ${category}`);
  const recipesCol = collection(db, 'recipes');
  const categoryQuery = query(recipesCol, where('category', '==', category));
  const recipeSnapshot = await getDocs(categoryQuery);
  console.log(`Query snapshot size: ${recipeSnapshot.size}`);
  const recipes = recipeSnapshot.docs.map(doc => {
    const data = doc.data();
    console.log(`Recipe ${doc.id}:`, data);
    return { id: doc.id, ...data } as Recipe;
  });
  console.log(`Fetched ${recipes.length} recipes for category: ${category}`);
  return recipes;
}

export async function getFeaturedRecipes(): Promise<Recipe[]> {
  const categories = ['Breakfast', 'Lunch', 'Dinner'];
  const featuredRecipes: Recipe[] = [];

  for (const category of categories) {
    const recipesCol = collection(db, 'recipes');
    const categoryQuery = query(
      recipesCol, 
      where('category', '==', category),
      where('featured', '==', true),
      limit(1)
    );
    const recipeSnapshot = await getDocs(categoryQuery);
    if (!recipeSnapshot.empty) {
      const recipeData = recipeSnapshot.docs[0].data();
      featuredRecipes.push({ id: recipeSnapshot.docs[0].id, ...recipeData } as Recipe);
    }
  }

  console.log(`Fetched ${featuredRecipes.length} featured recipes`);
  return featuredRecipes;
}
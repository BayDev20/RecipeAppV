# Recipe App

## Overview

Recipe App is a modern, user-friendly web application designed to help food enthusiasts discover, save, and share their favorite recipes. With an intuitive interface and powerful features, it's the perfect tool for both amateur cooks and seasoned chefs.

   ![Recipe App Screenshot](assets/imgs/recipeapp.png)

## Features

- **Recipe Browse**: Explore a vast collection of recipes from various cuisines.
- **AI Recipe Generator**: Get personalized recipe suggestions based on your preferences and available ingredients.
- **Search Functionality**: Easily find recipes by name, ingredients, or category.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices.
- **Featured Recipes**: Discover trending and seasonal recipes on the homepage.
- **Recipe Details**: View detailed instructions, ingredients, and nutritional information for each recipe.
- **User Profiles**: Create and customize your profile, save favorite recipes, and share your own creations.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Firebase (Authentication, Firestore, Cloud Functions)
- **State Management**: React Hooks
- **AI Integration**: OpenAI API for recipe generation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BayDev20/recipe-app-v.git
   cd recipe-app-v
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Browsing Recipes**: Navigate through the homepage to view featured recipes or use the search bar to find specific recipes.
- **AI Recipe Generation**: Click on the "Generate" tab to access the AI recipe generator. Input your preferences or available ingredients to get personalized recipe suggestions.
- **User Authentication**: Sign up or log in to save your favorite recipes and access personalized features.
- **Adding Recipes**: (If implemented) Use the "Add Recipe" feature to share your own recipes with the community.

## Contributing

We welcome contributions to the Recipe App! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact


Project Link: [https://recipe-app-v.vercel.app](https://github.com/BayDev20/RecipeAppV)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
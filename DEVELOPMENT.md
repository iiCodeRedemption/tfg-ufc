# Installation

1. Run `npm install` (or `npm i`) to install the dependencies.
2. Copy `.env.example` to `.env`.
3. Initialize a Supabase project with `npm run supabase:init`.
4. Start the Supabase stack using `npm run supabase:start`.
5. Configure the environment variables in your `.env` file.
6. Run `npm run db:setup` to setup the database.
7. Run `npm run dev` to start the development server.
8. Open `http://localhost:3000` in your browser.

Make sure the `SUPABASE_KEY` is the **Service Role** key, not the **anon** key. This ensures we can perform account deletion and other sensitive operations.

# Extensions

1. ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
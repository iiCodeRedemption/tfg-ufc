# Installation

Make sure Docker is installed (https://www.docker.com/products/docker-desktop/).

1. Run `npm install` (or `npm i`) to install the dependencies.
2. Copy `.env.example` to `.env`.
3. Initialize a Supabase project with `npm run supabase:init`.
4. Start the Supabase stack using `npm run supabase:start`.
5. Configure the environment variables in your `.env` file.
6. Run `npm run db:setup` to setup the database.
7. Run `npm run dev` to start the development server.
8. Open `http://localhost:3000` in your browser.

# Extensions

1. ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

# TODO:

- [ ] Fix all typing issues.
- [ ] Remove demo data and replace with real data.
- [ ] Add a loading states (skeletons) to each dynamic route.
- [ ] Fix Fight Card (once we have actual cards)

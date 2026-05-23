# UrbanCart - Full Stack E-Commerce Project

UrbanCart is a resume-ready e-commerce project built with React, Redux Toolkit, Strapi CMS and MySQL. The project includes a modern storefront, product management through Strapi, cart management, checkout flow, bill generation and transaction history.

## Tech Stack

- React.js
- Redux Toolkit + Redux Persist
- Strapi CMS
- MySQL
- Axios
- SCSS

## Resume Features

- Modern responsive e-commerce UI
- Product listing from Strapi API
- Product details page
- Working Add to Cart
- Quantity increase/decrease
- Remove item from cart
- Buy Now flow
- Checkout form
- Bill generation
- Local transaction/order history
- Print bill option
- Persistent cart using local storage
- Strapi product image uploads

## Run Backend

```bash
cd api
npm install
npm run develop
```

Open:

```text
http://localhost:1337/admin
```

## Run Frontend

```bash
cd client
npm install
npm start
```

Open:

```text
http://localhost:3000
```

## Frontend Environment

Create `client/.env`:

```env
REACT_APP_API_URL=http://localhost:1337/api
REACT_APP_UPLOAD_URL=http://localhost:1337
REACT_APP_API_TOKEN=
```

## Strapi Public Permissions

Go to:

```text
Settings → Users & Permissions Plugin → Roles → Public
```

Enable:

```text
Product: find, findOne
Category: find, findOne
SubCategory: find, findOne
Upload: find
```

## MySQL Database

The backend uses MySQL database `store` by default. Create it first:

```sql
CREATE DATABASE store;
```

Edit `api/config/database.js` with your local MySQL username/password.

## Resume Line

Developed a full-stack e-commerce application using React, Redux Toolkit, Strapi, and MySQL with product management, cart functionality, checkout flow, bill generation, and transaction history.

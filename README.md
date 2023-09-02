# book-catalog-backend

### User
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/auth/signup (POST)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/auth/signIn (POST)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user (GET) get only for admin (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (GET) get only for admin (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (PATCH) get only for admin (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (DELETE) get only for admin (add authorization in headers)

### Categroy
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/create-category (POST)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories (GET) get all category
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (GET) get one
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (PATCH) update category.  get only for admin (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (DELTE) FOR DELETE. get only for admin (add authorization in headers)

### Book
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books/create-book (POST) 
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books (GET)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (GET)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (PATCH) update book.  get only for admin (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (DELETE) delte book.  get only for admin (add authorization in headers)

### Order
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/orders/create-order(POST) create order only for customer (add authorization in headers)
##### https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/orders (GET) if admin then show all ordre and if any customer then show only that customer orders  (add authorization in headers)





# book-catalog-backend

### User
<ul>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/auth/signIn (POST)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user (GET) get only for admin (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (GET) get only for admin (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (PATCH) get only for admin (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/user/9ac9973c-41c4-43e2-a97e-7751d88921aa (DELETE) get only for admin (add authorization in headers)</li>
</ul>

### Categroy
<ul>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/create-category (POST)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories (GET) get all category</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (GET) get one</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (PATCH) update category. get only for admin (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/categories/eaacec6b-71a4-463a-98b5-5819588fdceb (DELETE) FOR DELETE. get only for admin (add authorization in headers)</li>
</ul>

### Book
<ul>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books/create-book (POST)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books (GET)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (GET)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (PATCH) update book. get only for admin (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/books/039e8810-1d94-4372-a03d-e7e58f5c9fa8 (DELETE) delete book. get only for admin (add authorization in headers)</li>
</ul>

### Order
<ul>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/orders/create-order (POST) create order only for customer (add authorization in headers)</li>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/orders (GET) if admin then show all orders, and if any customer then show only that customer orders (add authorization in headers)</li>
</ul>

### Bonus Part
<ul>
  <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/orders/:orderId  </li> with a specific user (add authorization in headers)
   <li>https://book-catalogs-server-tanjinhossain1.vercel.app/api/v1/profile  </li> with a specific user (add authorization in headers)
</ul>



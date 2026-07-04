-- KisanKart database schema
-- Run this once in the Supabase SQL editor for your project.

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
create index on categories(name);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  category_id uuid not null references categories(id) on delete restrict,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
create index on products(name);
create index on products(category_id);
create index on products(created_at);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  total_amount numeric(10, 2) not null,
  status text default 'completed',
  created_at timestamp default now()
);
create index on orders(customer_email);
create index on orders(created_at);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric(10, 2) not null,
  created_at timestamp default now()
);
create index on order_items(order_id);
create index on order_items(product_id);

-- Row Level Security
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read access for storefront
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);

-- Authenticated admin write access
create policy "admin write categories" on categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Orders: anyone can create an order (checkout is public), only admins can read/manage
create policy "public create orders" on orders for insert with check (true);
create policy "admin read orders" on orders for select using (auth.role() = 'authenticated');
create policy "public create order_items" on order_items for insert with check (true);
create policy "admin read order_items" on order_items for select using (auth.role() = 'authenticated');

-- Enable realtime for storefront sync
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table categories;

# KisanKart - Agriculture E-Commerce Application - Development Plan

## Project Overview

Build a production-ready, beginner-friendly agricultural e-commerce platform with:
- **Public storefront** with product browsing, search, filtering, and shopping cart
- **Admin panel** for product and category management
- **Real-time synchronization** between admin and public site
- **Email notifications** for order confirmations
- **Secure authentication** using Supabase
- **Clean white and green theme** for a professional agriculture brand aesthetic

---

## Tech Stack Summary

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Framework | Latest (App Router) |
| Tailwind CSS | Styling | Latest |
| Supabase | Backend/Database | Cloud Service |
| Resend | Email Service | API |
| React | UI Library | Latest |

---

## Color Theme & Branding

### Primary Colors
| Color | Hex Code | Purpose | Usage |
|-------|----------|---------|-------|
| White | #FFFFFF | Primary background | Page backgrounds, cards |
| Forest Green | #1B5E20 | Primary accent | Buttons, headers, CTAs |
| Light Green | #81C784 | Secondary accent | Highlights, hover states |
| Sage Green | #A5D6A7 | Tertiary accent | Borders, backgrounds |
| Dark Gray | #333333 | Text | Body text, headings |
| Light Gray | #F5F5F5 | Subtle backgrounds | Section backgrounds |

### Gradient Colors (White to Green)
| Gradient | Colors | Purpose | Usage |
|----------|--------|---------|-------|
| Soft Gradient | White → Sage Green | Backgrounds | Hero sections, card backgrounds |
| Medium Gradient | White → Light Green | Interactive | Hover states, overlays |
| Strong Gradient | White → Forest Green | CTAs & Accents | Buttons, headers, prominent sections |

### Professional Typography
- **Font Family (Primary)**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Font Family (Heading)**: "Poppins", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Headings**: Poppins (bold, 600-700 weight)
- **Body Text**: Inter (regular, 400-500 weight)
- **Accent Text**: Poppins (semi-bold, 600 weight)

### Design Guidelines
- **Background**: Clean white (#FFFFFF) as primary
- **Accents**: Forest Green for primary actions and key elements
- **Interactive Elements**: Light Green for hover/active states
- **Text**: Dark Gray for readability on white backgrounds
- **Borders**: Sage Green for subtle separations
- **Gradients**: Use white-to-green gradients for depth and visual hierarchy
- **Overall Feel**: Fresh, natural, trustworthy, modern, professional (agriculture-focused)

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        'heading': ['"Poppins"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        'forest-green': '#1B5E20',
        'light-green': '#81C784',
        'sage-green': '#A5D6A7',
        'primary': '#1B5E20',
        'secondary': '#81C784',
      },
      backgroundImage: {
        'gradient-green-soft': 'linear-gradient(135deg, #FFFFFF 0%, #A5D6A7 100%)',
        'gradient-green-medium': 'linear-gradient(135deg, #FFFFFF 0%, #81C784 100%)',
        'gradient-green-strong': 'linear-gradient(135deg, #FFFFFF 0%, #1B5E20 100%)',
      },
    },
  },
}
```

### Font Weight Reference
- **Regular**: 400
- **Medium**: 500
- **Semi-bold**: 600
- **Bold**: 700

---

## Project Architecture

```
Frontend (Next.js App Router)
    ├── Public Pages (Home, Products, Cart)
    ├── Admin Panel (Protected Routes)
    └── Components (Reusable UI)

Backend (Server Actions & API Routes)
    ├── Database Operations (Supabase)
    ├── Authentication (Supabase Auth)
    ├── Real-time Listeners (Supabase Realtime)
    └── Email Service (Resend)

Database (Supabase PostgreSQL)
    ├── Categories Table
    ├── Products Table
    ├── Orders Table
    └── Order Items Table

External Services
    ├── Supabase (Database, Auth, Realtime)
    └── Resend (Email Delivery)
```

---

## Database Schema Design

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

**Indexes:**
- `ON categories(name)` - For search optimization

---

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

**Indexes:**
- `ON products(name)` - For search optimization
- `ON products(category_id)` - For filtering
- `ON products(created_at)` - For sorting

---

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT now()
);
```

**Indexes:**
- `ON orders(customer_email)` - For customer lookup
- `ON orders(created_at)` - For sorting

---

### Order Items Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

**Indexes:**
- `ON order_items(order_id)` - For order lookup
- `ON order_items(product_id)` - For product tracking

---

## Folder Structure

```
ecommerce-app/
├── app/
│   ├── layout.jsx                 # Root layout
│   ├── page.jsx                   # Home page
│   ├── (public)/
│   │   ├── products/
│   │   │   ├── page.jsx           # Products listing (alt home)
│   │   │   ├── search/
│   │   │   │   └── page.jsx       # Search results page
│   │   │   └── [id]/
│   │   │       └── page.jsx       # Product details
│   │   └── cart/
│   │       └── page.jsx           # Cart page
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.jsx         # Admin layout with auth check
│   │       ├── page.jsx           # Admin dashboard
│   │       ├── products/
│   │       │   ├── page.jsx       # Products management
│   │       │   ├── create/
│   │       │   │   └── page.jsx   # Create product
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.jsx # Edit product
│   │       └── categories/
│   │           ├── page.jsx       # Categories management
│   │           ├── create/
│   │           │   └── page.jsx   # Create category
│   │           └── [id]/
│   │               └── edit/
│   │                   └── page.jsx # Edit category
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/     # If using NextAuth later
│   │   └── webhooks/
│   │       └── resend.js          # Resend webhook (optional)
│   └── actions/
│       ├── products.js            # Product Server Actions
│       ├── categories.js          # Category Server Actions
│       ├── orders.js              # Order Server Actions
│       └── cart.js                # Cart Server Actions
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── products/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductForm.jsx
│   │   └── SearchBar.jsx
│   ├── categories/
│   │   ├── CategoryFilter.jsx
│   │   └── CategoryForm.jsx
│   ├── cart/
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── CheckoutForm.jsx
│   ├── admin/
│   │   ├── DashboardCard.jsx
│   │   ├── DataTable.jsx
│   │   └── ConfirmDelete.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Textarea.jsx
│       └── Modal.jsx
├── config/
│   ├── app.js                     # App configuration
│   ├── constants.js               # App constants
│   ├── email.js                   # Email configuration
│   ├── navigation.js              # Navigation routes
│   ├── routes.js                  # Route patterns
│   └── supabase.js                # Supabase configuration
├── hooks/
│   ├── useCart.js                 # Cart state management
│   ├── useProducts.js             # Products fetching
│   ├── useCategories.js           # Categories fetching
│   ├── useAuth.js                 # Authentication
│   └── useRealtime.js             # Real-time subscriptions
├── lib/
│   ├── supabase/
│   │   ├── client.js              # Supabase client (browser)
│   │   ├── server.js              # Supabase client (server)
│   │   └── admin.js               # Supabase admin client
│   ├── email/
│   │   └── resend.js              # Resend client
│   ├── utils.js                   # General utilities
│   └── validators.js              # Input validation
├── services/
│   ├── products.service.js        # Product business logic
│   ├── categories.service.js      # Category business logic
│   ├── orders.service.js          # Order business logic
│   ├── email.service.js           # Email business logic
│   └── realtime.service.js        # Real-time service
├── types/
│   ├── database.js                # Database types
│   ├── product.js                 # Product types
│   ├── category.js                # Category types
│   ├── order.js                   # Order types
│   ├── cart.js                    # Cart types
│   └── api.js                     # API response types
├── utils/
│   ├── formatting.js              # Format utilities
│   ├── validation.js              # Validation utilities
│   ├── errors.js                  # Error handling
│   └── constants.js               # Shared constants
├── middleware.js                  # Next.js middleware
├── public/
│   └── placeholder.svg            # Placeholder image
├── .env.local                      # Environment variables (local)
├── .env.example                    # Environment template
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind configuration
├── package.json                    # Dependencies
└── README.md                       # Documentation
```

---

## Development Phases

### Phase 1: Project Setup
- [ ] Initialize Next.js project
- [ ] Configure Tailwind CSS
- [ ] Set up folder structure
- [ ] Create environment variables template
- [ ] Install all dependencies

### Phase 2: Supabase Configuration
- [ ] Create Supabase project
- [ ] Set up authentication (admin user)
- [ ] Create database tables
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure Supabase clients (browser & server)

### Phase 3: Core Configuration
- [ ] Create configuration files
- [ ] Set up constants
- [ ] Configure routes
- [ ] Set up type definitions
- [ ] Create validation utilities

### Phase 4: Public Storefront
- [ ] Create layout and navigation (white background with green accents, professional fonts)
- [ ] Build home page with hero section (white-to-green gradient, white text, Poppins heading)
- [ ] Create product grid component (white cards with gradient green hover effects, Inter body)
- [ ] Implement product search (green search button with gradient, white input, professional fonts)
- [ ] Implement category filtering (sage green badges, light green active states)
- [ ] Create product details page (white layout with gradient green highlights, typography hierarchy)
- [ ] Implement real-time product updates (smooth transitions with gradient green indicators)

### Phase 5: Shopping Cart
- [ ] Create cart state management (localStorage + Context)
- [ ] Build cart page UI (white background with gradient green accents, professional fonts)
- [ ] Implement quantity controls (gradient green +/- buttons with professional styling)
- [ ] Create order summary (gradient sage green background section, typography hierarchy)
- [ ] Add checkout form (gradient green submit button with hover effects, Inter fonts)

### Phase 6: Admin Panel
- [ ] Create admin layout with authentication check (white layout with gradient green sidebar, Poppins)
- [ ] Build admin dashboard (gradient green header with stats cards on white background, professional fonts)
- [ ] Create product management (CRUD) (gradient green action buttons, white cards, Inter body text)
- [ ] Create category management (CRUD) (sage green badges, gradient green edit/delete buttons)
- [ ] Add admin navigation (gradient green navigation bar, light green active states, typography hierarchy)

### Phase 7: Backend Operations
- [ ] Create product Server Actions
- [ ] Create category Server Actions
- [ ] Create order Server Actions
- [ ] Implement input validation
- [ ] Add error handling

### Phase 8: Real-time Integration
- [ ] Set up Supabase Realtime listeners
- [ ] Implement real-time product updates
- [ ] Implement real-time category updates
- [ ] Create custom hooks for subscriptions
- [ ] Test real-time synchronization

### Phase 9: Email Integration
- [ ] Configure Resend API
- [ ] Create email templates
- [ ] Build email service
- [ ] Integrate with checkout flow
- [ ] Test email delivery

### Phase 10: Security & Optimization
- [ ] Implement authentication checks
- [ ] Add authorization middleware
- [ ] Optimize images
- [ ] Set up error boundaries
- [ ] Add loading states
- [ ] Security audit

### Phase 11: Testing & Refinement
- [ ] Test all features
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Final bug fixes

---

## Key Features Implementation

### 1. Product Management

**Server Actions (`app/actions/products.js`):**
- `getProducts()` - Fetch all products with filters
- `getProductById(id)` - Fetch single product
- `createProduct(data)` - Create new product (admin only)
- `updateProduct(id, data)` - Update product (admin only)
- `deleteProduct(id)` - Delete product (admin only)
- `searchProducts(query)` - Search products

**Real-time Updates:**
- Subscribe to products table changes
- Update UI without page refresh
- Handle insert, update, delete events

---

### 2. Category Management

**Server Actions (`app/actions/categories.js`):**
- `getCategories()` - Fetch all categories
- `getCategoryById(id)` - Fetch single category
- `createCategory(data)` - Create new category (admin only)
- `updateCategory(id, data)` - Update category (admin only)
- `deleteCategory(id)` - Delete category (admin only)

**Real-time Updates:**
- Subscribe to categories table changes
- Update filters without refresh

---

### 3. Shopping Cart

**Implementation Strategy:**
- Use browser localStorage for cart persistence
- Use React Context for state management
- Cart structure: `{ productId, quantity, price }`
- Calculate totals on the fly
- Validate quantities and product availability

**Operations:**
- Add to cart
- Remove from cart
- Update quantity
- Clear cart
- Get cart summary

---

### 4. Checkout & Orders

**Checkout Flow:**
1. User reviews cart items
2. Enters customer information (name, email)
3. Creates order in database
4. Creates order items for each cart item
5. Sends confirmation email via Resend
6. Clears cart
7. Shows success message

**Order Data:**
- Order ID (UUID)
- Customer name & email
- Order items with product details
- Total amount
- Timestamp

---

### 5. Authentication

**Admin Panel Protection:**
- Middleware checks for authenticated user
- Redirect unauthenticated users to login
- Session management via Supabase
- Logout functionality

**Supabase Auth Setup:**
- Create admin user manually
- Use email/password authentication
- Store session in browser
- Protect sensitive operations

---

### 6. Real-time Synchronization

**Implementation:**
- Supabase Realtime subscriptions
- Listen to products table changes
- Listen to categories table changes
- Use custom React hooks
- Auto-update components without refresh

**Events to Handle:**
- INSERT - New product/category added
- UPDATE - Product/category modified
- DELETE - Product/category removed

---

### 7. Email Integration

**Resend Configuration:**
- Store API key in environment variables
- Create email templates
- Send transactional emails

**Email Template:**
```
Subject: Order Confirmation - [Order ID]

Hi [Customer Name],

Thank you for your order on KisanKart!

Order Details:
- Order ID: [Order ID]
- Order Date: [Date]

Items Ordered:
1. Product Name × Quantity: $Price
2. Product Name × Quantity: $Price

Total Amount: $[Total]

We appreciate your business and look forward to serving you again!

Best regards,
KisanKart Team
```

---

## Security Implementation

### Authentication & Authorization
- [x] Protected admin routes with middleware
- [x] Session management
- [x] Admin-only operations (CRUD)
- [x] User identification for orders

### Input Validation
- [x] Client-side validation (immediate feedback)
- [x] Server-side validation (security)
- [x] Schema validation for all inputs

### Data Protection
- [x] Environment variables for secrets
- [x] Service role key only in server actions
- [x] Secure cookie storage for sessions
- [x] HTTPS in production

### Database Security
- [x] Row Level Security (RLS) policies
- [x] Foreign key constraints
- [x] NOT NULL constraints
- [x] CHECK constraints for quantities

### API Security
- [x] Server-side validation for all requests
- [x] Rate limiting (consider implementing)
- [x] CSRF protection (Next.js built-in)
- [x] XSS protection (React built-in)

---

## Supabase Setup Steps

### 1. Create Supabase Project
- Go to supabase.com
- Create new project
- Choose region
- Note project URL and anon key

### 2. Database Setup
- Create tables (Categories, Products, Orders, Order Items)
- Set up indexes
- Configure foreign keys

### 3. Authentication Setup
- Enable email/password authentication
- Create admin user
- Configure auth policies

### 4. Row Level Security (RLS)
```sql
-- Products table (public read, admin write)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for authenticated users" 
  ON products FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Similar policies for categories, orders
```

### 5. Real-time Setup
- Enable Realtime for tables
- Configure broadcast settings
- Test with client

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=your-resend-api-key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=KisanKart
```

**Security Note:** Never commit `.env.local` to version control. Use `.env.example` as template.

---

## Dependencies

### Core
- `next`: Framework
- `react`: UI library

### UI & Styling
- `tailwindcss`: Styling
- `clsx`: Conditional classes
- `lucide-react`: Icons

### Backend
- `@supabase/supabase-js`: Supabase client
- `@supabase/auth-helpers-nextjs`: Auth integration
- `resend`: Email service

### Validation
- `zod`: Schema validation
- `client-only`: Client component helpers

---

## File Generation Order

1. **Configuration Files**
   - `config/app.js`
   - `config/constants.js`
   - `config/routes.js`
   - `config/navigation.js`
   - `config/email.js`
   - `config/supabase.js`

2. **Type Definitions**
   - `types/database.js`
   - `types/product.js`
   - `types/category.js`
   - `types/order.js`
   - `types/cart.js`

3. **Utilities**
   - `lib/supabase/client.js`
   - `lib/supabase/server.js`
   - `lib/supabase/admin.js`
   - `lib/email/resend.js`
   - `lib/utils.js`
   - `lib/validators.js`
   - `utils/formatting.js`
   - `utils/validation.js`
   - `utils/errors.js`

4. **Services**
   - `services/products.service.js`
   - `services/categories.service.js`
   - `services/orders.service.js`
   - `services/email.service.js`
   - `services/realtime.service.js`

5. **Hooks**
   - `hooks/useCart.js`
   - `hooks/useProducts.js`
   - `hooks/useCategories.js`
   - `hooks/useAuth.js`
   - `hooks/useRealtime.js`

6. **Common Components**
   - `components/common/Header.jsx`
   - `components/common/Footer.jsx`
   - `components/common/Navbar.jsx`
   - `components/ui/*`

7. **Feature Components**
   - `components/products/*`
   - `components/categories/*`
   - `components/cart/*`
   - `components/admin/*`

8. **Server Actions**
   - `app/actions/products.js`
   - `app/actions/categories.js`
   - `app/actions/orders.js`
   - `app/actions/cart.js`

9. **Public Pages**
   - `app/layout.jsx`
   - `app/page.jsx`
   - `app/(public)/products/page.jsx`
   - `app/(public)/products/[id]/page.jsx`
   - `app/(public)/cart/page.jsx`

10. **Admin Pages**
    - `app/(admin)/admin/layout.jsx`
    - `app/(admin)/admin/page.jsx`
    - `app/(admin)/admin/products/page.jsx`
    - `app/(admin)/admin/products/create/page.jsx`
    - `app/(admin)/admin/products/[id]/edit/page.jsx`
    - `app/(admin)/admin/categories/page.jsx`
    - `app/(admin)/admin/categories/create/page.jsx`
    - `app/(admin)/admin/categories/[id]/edit/page.jsx`

11. **Configuration**
    - `next.config.js`
    - `tailwind.config.js`
    - `middleware.js`
    - `package.json`

---

## Testing Checklist

### Functionality
- [ ] Products load correctly
- [ ] Search filters work
- [ ] Category filtering works
- [ ] Product details display correctly
- [ ] Add to cart functionality
- [ ] Cart updates correctly
- [ ] Checkout completes successfully
- [ ] Order confirmation email sent
- [ ] Admin login works
- [ ] Product creation works
- [ ] Product update works
- [ ] Product deletion works
- [ ] Category creation works
- [ ] Category update works
- [ ] Category deletion works

### Real-time
- [ ] Admin creates product → appears on public site
- [ ] Admin updates product → updates on public site
- [ ] Admin deletes product → removes from public site
- [ ] Same for categories

### Security
- [ ] Unauthenticated users cannot access admin
- [ ] Admin operations require authentication
- [ ] Input validation works
- [ ] XSS protection works
- [ ] CSRF protection works
- [ ] Sensitive data not exposed in browser

### Performance
- [ ] Page loads quickly
- [ ] Search is responsive
- [ ] No unnecessary re-renders
- [ ] Images load efficiently

### Responsive Design
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Navigation accessible on mobile

---

## Deployment Considerations

### Pre-deployment
- [ ] Review all environment variables
- [ ] Test all features in production mode
- [ ] Run security audit
- [ ] Optimize bundle size
- [ ] Set up analytics (optional)

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Deploy production
vercel --prod
```

### Environment Setup
- Set `NEXT_PUBLIC_SUPABASE_URL`
- Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Set `SUPABASE_SERVICE_ROLE_KEY`
- Set `RESEND_API_KEY`

---

## Performance Optimization

### Frontend
- Use Server Components by default
- Use Client Components only for interactivity
- Implement code splitting
- Use dynamic imports for heavy components
- Optimize images with Next.js Image component
- Implement lazy loading

### Backend
- Optimize database queries
- Use indexes strategically
- Implement caching where appropriate
- Use pagination for large datasets
- Monitor Supabase usage

### Realtime
- Subscribe to specific columns
- Unsubscribe on component unmount
- Avoid over-subscribing
- Use filters in subscriptions

---

## Common Patterns & Best Practices

### UI/Styling Patterns

#### Button Styling
```jsx
// Primary Button (Forest Green Gradient)
<button className="bg-gradient-green-strong text-white font-semibold hover:shadow-lg transition-all ...">
  Action
</button>

// Secondary Button (Sage Green)
<button className="bg-sage-green text-dark-gray font-medium hover:bg-light-green ...">
  Secondary Action
</button>
```

#### Card Components
```jsx
// Product Card (Professional Spacing)
<div className="bg-white border border-sage-green rounded-lg shadow-sm hover:shadow-md hover:border-light-green transition-all ...">
  <h3 className="font-heading font-bold text-forest-green">Product Name</h3>
  <p className="font-sans text-dark-gray">Description text</p>
</div>
```

#### Navigation Elements
```jsx
// Navigation (Gradient Green Background)
<nav className="bg-gradient-green-strong">
  <a className="text-white font-heading font-semibold hover:bg-light-green ...">
    Navigation Item
  </a>
</nav>
```

#### Heading Hierarchy
```jsx
// H1 - Page Title (Poppins Bold)
<h1 className="font-heading font-bold text-4xl text-forest-green">Page Title</h1>

// H2 - Section Header (Poppins SemiBold)
<h2 className="font-heading font-semibold text-2xl text-forest-green">Section Title</h2>

// H3 - Subsection (Poppins SemiBold)
<h3 className="font-heading font-semibold text-lg text-forest-green">Subsection</h3>

// Body Text (Inter Regular)
<p className="font-sans font-normal text-base text-dark-gray">Body text content</p>
```

#### Form Elements
```jsx
// Input with Green Gradient Focus
<input className="border-sage-green focus:border-forest-green focus:ring-2 focus:ring-light-green font-sans ..." />

// Submit Button (Gradient)
<button className="bg-gradient-green-strong text-white font-semibold hover:shadow-lg ..." />
```

---

### Error Handling
```javascript
try {
  // Operation
} catch (error) {
  console.error('Operation failed:', error);
  return { error: 'User-friendly message' };
}
```


### Validation
```javascript
// Validate before database operations
const schema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});
```

### Server Actions
```javascript
'use server';

export async function createProduct(formData) {
  // Validate input
  // Call Supabase
  // Return result
  // Revalidate cache
}
```

---

## Next Steps

1. **Setup Phase**: Follow Supabase setup instructions
2. **Generate Code**: Generate all files in specified order
3. **Configuration**: Add environment variables
4. **Testing**: Test each feature systematically
5. **Optimization**: Optimize performance
6. **Deployment**: Deploy to production

---

## Project Success Criteria

✅ All features implemented and working
✅ Clean, readable, maintainable code
✅ No hardcoded values
✅ Proper error handling
✅ Security best practices followed
✅ Real-time updates working
✅ Email notifications sent
✅ Responsive design
✅ Good performance
✅ Production-ready

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Document Version**: 1.0
**Last Updated**: 2024
**Status**: Ready for Implementation
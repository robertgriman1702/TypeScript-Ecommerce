import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../Layouts/RootLayout';
import { HomePage, AboutPage, ProductsPage } from '../Pages';
import { LoginPage }    from '../Pages/LoginPage';
import { RegisterPage } from '../Pages/RegisterPage';
import { CartPage }     from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import { OrdersPage }   from '../Pages/OrdersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,          element: <HomePage />     },
      { path: 'products',     element: <ProductsPage /> },
      { path: 'about',        element: <AboutPage />    },
      { path: 'login',        element: <LoginPage />    },
      { path: 'register',     element: <RegisterPage /> },
      { path: 'cart',         element: <CartPage />     },
      { path: 'checkout',     element: <CheckoutPage /> },
      { path: 'orders',       element: <OrdersPage />   },
    ],
  },
]);
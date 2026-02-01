import { createBrowserRouter } from 'react-router'
import { RootLayout } from '../Layouts/RootLayout.tsx'
import { HomePage, AboutPage, ProductsPage} from '../Pages'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />, 
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '',
                element: <ProductsPage />
            },
            {
                path: '',
                element: <AboutPage />
            }
        ]
    }
])

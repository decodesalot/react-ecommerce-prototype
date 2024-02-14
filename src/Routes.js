import { Routes, Route } from 'react-router-dom';
import Products from './views/Products';
import Checkout from './views/Checkout';
import Home from './views/Home';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/products" Component={Products} />
            <Route path="/checkout" Component={Checkout} />
        </Routes>
    );
};

export default AppRoutes;

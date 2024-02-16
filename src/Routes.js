import { Routes, Route } from 'react-router-dom';
import Products from './views/Products';
import Checkout from './views/Checkout';
import Home from './views/Home';
import Confirmation from './views/Confirmation';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/products" Component={Products} />
            <Route path="/checkout" Component={Checkout} />
            <Route path="/confirmation" Component={Confirmation} />
        </Routes>
    );
};

export default AppRoutes;

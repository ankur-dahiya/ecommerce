import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product_list/ProductList";

export default function Home(){
    return (
        <div>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
        </div>
    );
}
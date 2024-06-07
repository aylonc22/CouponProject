
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Footer } from "../Footer/Footer";
import "./MainLayout.css";
import { MainRoute } from "../../../Routes/MainRoute/MainRoute";

export function MainLayout(): JSX.Element {
    
    return (
        <div className="MainLayout">
			<header>
                <Header/>
            </header>
            <aside>
                <Menu/>
            </aside>
            <main>
                <MainRoute/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}
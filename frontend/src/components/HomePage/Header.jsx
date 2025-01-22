import {FaSearch , FaUser} from "react-icons/fa";

export default function Header(){
    return(
        <header className="bg-bodyBg w-full p-4 h-16 flex justify-around items-center shadow-md">
            <h1 className="text-highlight font-bold text-2xl cursor-pointer font-primaryfont">Collab Forge</h1>
            <nav>
                <ul className="flex justify-between items-center gap-8 cursor-pointer font-primaryfont">
                    <li className="hover:text-xl hover:text-accent font-semibold transition-all duration-300 ease-in-out">Home</li>
                    <li className="hover:text-xl hover:text-accent font-semibold transition-all duration-300 ease-in-out">About</li>
                    <li className="hover:text-xl hover:text-accent font-semibold transition-all duration-300 ease-in-out">Contact</li>
                    <li className="hover:text-xl hover:text-accent font-semibold transition-all duration-300 ease-in-out">Register</li>
                </ul>
            </nav>
            <div className="flex justify-between items-center gap-4">
                <FaSearch/>
                <FaUser/>
            </div>
        </header>
    );
}
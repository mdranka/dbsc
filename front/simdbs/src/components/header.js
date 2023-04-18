import Logo from "./logo.png"
export default function Header() {
    return(
        <header>
            <div className="header">
                <img src={Logo} />
            </div>
        
            <div className="line"></div>
        </header>
    )
}
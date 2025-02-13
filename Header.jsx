import chefClaudeLogo from "./images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Recipe by AI</h1>
        </header>
    )
}
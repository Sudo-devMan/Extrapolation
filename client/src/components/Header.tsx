
function Header() {
    return (
        <header className="flex items-center justify-between p-2">
            <h1 className="archivo text-3xl">ExtraPolation</h1>
            <div className="border-3 rounded-full w-11 p-1">
                <img className="right-0" src="extrapolation.png" alt="Pi" width={30} />
            </div>
        </header>
    )
}

export default Header

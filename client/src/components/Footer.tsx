
function Footer() {
    return (
        <footer className="w-full p-3 bg-gray-300 border-t-3">
            <h1 className="archivo text-xl mb-3">ExtraPolation</h1>
            {/* <div className="grid sm:grid-cols-4 grid-cols-2">
                <div>
                    <h2 className="archivo">Links</h2>
                    <p>Home</p>
                    <p>Grade 8</p>
                    <p>Grade 9</p>
                    <p>Grade 10</p>
                    <p>Grade 11</p>
                    <p>Grade 12</p>
                </div>

                <div>
                    <h2 className="archivo">Support</h2>
                    <p>About</p>
                    <p>How to use</p>
                    <p>Contact</p>
                    <p>Services</p>
                </div>
            </div> */}

            <h1 className="m-4 text-center italic text-sm">&copy; {new Date().getFullYear()} Developed by <a href="https://github.com/Sudo-devMan" target="_blank" rel="noopener noreferrer">Devman</a></h1>
        </footer>
    )
}

export default Footer

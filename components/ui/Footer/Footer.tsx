export default function Footer() {
    return (
        <footer>
            <h2 className="sr-only">Footer</h2>
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-16">
                <div className="flex flex-wrap items-baseline lg:justify-center">
                    <span className="mt-2 text-sm font-light text-gray-500">
                        <>
                            Copyright © {new Date().getFullYear()}
                            <a href="https://kamilmarut.com" className="mx-2" rel="noopener noreferrer">Kamil Marut</a>
                        </>
                    </span>
                </div>
            </div>
        </footer>
    )
}

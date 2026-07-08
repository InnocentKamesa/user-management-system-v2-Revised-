export default function AuthLayout({children,}:{children:React.ReactNode}){
    return (
        <div className="bg-gray-100 h-screen w-screen suppressHydrationWarning={true}">
            <div className="flex items-center w-screen h-screen bg-gray-200 rounded-md shadow-md">
                <div className=" overflow-scroll m-auto flex flex-col gap-2 md:m-4 w-full h-full bg-white/90 rounded-md shadow-md border-2 border-black/20">
                {children}
                </div>
            </div>
        </div>
    )
}

 
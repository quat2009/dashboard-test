const Unauthorized = () => {
    return (
        <main className="w-full h-full flex flex-col items-center mt-[5%] gap-4">
            <strong className="text-2xl">401: Unauthorized access to site!</strong>
            <p className="bg-red-500/80 py-3 px-5 rounded-full text-white">
                This will be reported!
            </p>
        </main>
    );
};

export default Unauthorized;

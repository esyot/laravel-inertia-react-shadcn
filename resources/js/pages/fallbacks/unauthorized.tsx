export default function Unauthorized() {
    return (
        <main>
            <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
                <div>
                    <img
                        src="/assets/gifs/403.webp"
                        alt=""
                        width={200}
                        height={200}
                    />
                </div>
                <h1 className="text-3xl font-bold">403 - Unauthorized</h1>
                <p className="mt-4 text-center text-lg">
                    You do not have permission to access this page.
                </p>

                <small className="mt-6 bg-red-100 p-4 rounded-lg text-center text-red-500">
                    If you believe this is an error, please contact support.
                </small>
            </div>
        </main>
    );
}

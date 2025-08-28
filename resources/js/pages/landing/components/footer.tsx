export default function footer({ name = "Electric - Billing" }) {
    const year = new Date().getFullYear();
    return (
        <div className="px-6 md:px-12 py-6 border-t text-center text-xs text-slate-400">
            © {year} {name}
        </div>
    );
}

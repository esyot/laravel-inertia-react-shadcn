import Layout from "../layout";
import SectionHeader from "@/components/section-header";
import SectionContent from "@/components/section-content";

export default function Index() {
    return (
        <main>
            <Layout>
                <SectionHeader className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Point of Sale</h1>
                </SectionHeader>
                <SectionContent header={false}>
                    <div className="container p-1 mx-auto flex flex-row gap-6 space-y-0">
                        <div className="card bg-white rounded-lg border shadow-md flex-1">
                            <div className="card-header px-4 pt-4 border-b pb-2">
                                <span className="text-2xl font-semibold">
                                    Billing Details
                                </span>
                            </div>
                            <form className="card-body space-y-4 p-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        Previous Reading:
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        8903
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Current Reading:
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        9050
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Consumption (kWh):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        147
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Rate per kWh(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        1.57
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Total Bill(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        231.79
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Penalties / Discounts (if
                                        applicable)(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        0.00
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Outstanding Balance (if unpaid bills
                                        exist)(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        0.00
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="card bg-white rounded-lg border shadow-md flex-1">
                            <div className="card-header px-4 pt-4 border-b pb-2">
                                <span className="text-2xl font-semibold">
                                    Payment Section
                                </span>
                            </div>
                            <form className="card-body space-y-4 p-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        Amount Due(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        231.79
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Payment Method:
                                    </label>
                                    <select className="block w-full border rounded-lg px-2 py-1">
                                        <option value="">Select method</option>
                                        <option value="cash">Cash</option>
                                        <option value="card">Card</option>
                                        <option value="ewallet">
                                            e-Wallet
                                        </option>
                                        <option value="bank">
                                            Bank Transfer
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Amount Paid(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        231.79
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Change (if cash)(₱):
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        0.00
                                    </span>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        Transaction ID:
                                    </label>
                                    <span className="block w-full border rounded-lg px-2 py-1">
                                        111111132
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card bg-white rounded-lg border shadow-md flex-1 mt-6">
                        <div className="card-header px-4 pt-4 border-b pb-2">
                            <span className="text-2xl font-semibold">
                                Transaction History
                            </span>
                        </div>
                        <div className="card-body p-4 overflow-x-auto">
                            <table className="min-w-full border rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-2 py-1 border">
                                            Previous Reading
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Current Reading
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Consumption (kWh)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Rate per kWh (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Total Bill (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Penalties / Discounts (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Outstanding Balance (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Amount Due (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Payment Method
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Amount Paid (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Change (₱)
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Receipt No. / Transaction ID
                                        </th>
                                        <th className="px-2 py-1 border">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-1 border">
                                            8903
                                        </td>
                                        <td className="px-2 py-1 border">
                                            9050
                                        </td>
                                        <td className="px-2 py-1 border">
                                            147
                                        </td>
                                        <td className="px-2 py-1 border">
                                            1.57
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            Cash
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            111111132
                                        </td>
                                        <td className="px-2 py-1 border">
                                            2025-09-04
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-1 border">
                                            8903
                                        </td>
                                        <td className="px-2 py-1 border">
                                            9050
                                        </td>
                                        <td className="px-2 py-1 border">
                                            147
                                        </td>
                                        <td className="px-2 py-1 border">
                                            1.57
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            Cash
                                        </td>
                                        <td className="px-2 py-1 border">
                                            231.79
                                        </td>
                                        <td className="px-2 py-1 border">
                                            0.00
                                        </td>
                                        <td className="px-2 py-1 border">
                                            111111132
                                        </td>
                                        <td className="px-2 py-1 border">
                                            2025-09-04
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SectionContent>
            </Layout>
        </main>
    );
}

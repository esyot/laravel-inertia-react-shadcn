import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import type { Customer, Paginated } from "@/lib/interface/types";

type CustomerTableProps = {
    customers: Paginated<Customer>;
    onView?: (customer: Customer) => void;
    onDelete?: (customer: Customer) => void;
};

export function CustomerTable({ customers }: CustomerTableProps) {
    const goToPage = (page: number) => {
        if (page >= 1 && page <= customers.last_page) {
            router.get(`/customers?page=${page}`);
        }
    };

    const handleView = (c: Customer) => {
        router.visit(`/customers/${c.code}`);
    };

    return (
        <div className="border-strong overflow-hidden rounded-xl border">
            {/* Header (desktop only) */}
            <div className="bg-sand-dugout text-weak border-strong hidden grid-cols-3 border-b px-5 pt-4 pb-3 text-sm font-medium md:grid">
                <div>Name / Code</div>
                <div>Location</div>
                <div className="flex justify-end mr-4">Actions</div>
            </div>

            {/* Body */}
            <div className="h-[calc(100vh-17.5rem)] divide-y divide-gray-200 overflow-y-scroll scroll-smooth">
                {customers.data.length > 0 ? (
                    customers.data.map((customer) => (
                        <div
                            key={customer.id}
                            className="px-6 py-4 hover:bg-gray-50"
                        >
                            <div className="grid gap-3 md:grid-cols-3 md:items-center">
                                {/* Name + Code on same row but separated */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#222222] truncate">
                                        {customer.name}
                                    </span>
                                    <span className="text-xs text-gray-600 font-mono ml-3">
                                        {customer.code}
                                    </span>
                                </div>

                                {/* Municipal + Barangay */}
                                <div className="text-sm text-gray-700">
                                    {customer.municipal}
                                    {customer.barangay
                                        ? `, ${customer.barangay}`
                                        : ""}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleView(customer)}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-4 text-center text-gray-500">
                        No customers found
                    </div>
                )}
            </div>

            {/* Footer / Pagination */}
            <div className="text-weak flex flex-col items-center justify-between gap-3 border-t px-6 py-3 text-sm font-medium md:flex-row">
                <div className="flex items-center gap-3">
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={customers.current_page <= 1}
                        onClick={() => goToPage(customers.current_page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="h-8 rounded-full border px-3 py-1 font-bold text-[#222222] hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                        disabled={customers.current_page >= customers.last_page}
                        onClick={() => goToPage(customers.current_page + 1)}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page {customers.current_page} of {customers.last_page} |{" "}
                    Total: {customers.total}
                </span>
            </div>
        </div>
    );
}

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableCaption,
//     TableHead,
//     TableHeader,
//     TableRow,
//     TableFooter,
// } from "@/components/ui/table";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationPrevious,
//     PaginationNext,
// } from "@/components/ui/pagination";
// import { Button } from "@/components/ui/button";
// import { router } from "@inertiajs/react";

// type Customer = {
//     id: number;
//     name: string;
//     municipal: string;
//     barangay: string;
//     purok?: string | null;
//     code: string;
// };

// type Paginated<T> = {
//     data: T[];
//     current_page: number;
//     last_page: number;
//     total: number;
//     per_page: number;
// };

// type CustomerTableProps = {
//     customers: Paginated<Customer>;
//     onView?: (customer: Customer) => void; // for later
//     onDelete?: (customer: Customer) => void; // for later
// };

// export function CustomerTable({ customers }: CustomerTableProps) {
//     const goToPage = (page: number) => {
//         if (page >= 1 && page <= customers.last_page) {
//             router.get(`/customers?page=${page}`); // reload data from backend
//         }
//     };

//     const handleView = (c: Customer) => {
//         // temp redirect using code
//         router.visit(`/customers/${c.code}`);
//     };

//     const getPages = () => {
//         const pages = [];
//         for (let i = 1; i <= customers.last_page; i++) {
//             pages.push(i);
//         }
//         return pages;
//     };

//     const prevDisabled = customers.current_page === 1;
//     const nextDisabled = customers.current_page === customers.last_page;

//     return (
//         <Table>
//             <TableCaption>A list of customers with actions.</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Municipal</TableHead>
//                     <TableHead>Barangay</TableHead>
//                     <TableHead>Code</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//             </TableHeader>

//             <TableBody>
//                 {customers.data.map((customer, index) => (
//                     <TableRow key={index}>
//                         <TableCell className="font-medium">
//                             {customer.name}
//                         </TableCell>
//                         <TableCell>{customer.municipal}</TableCell>
//                         <TableCell>{customer.barangay}</TableCell>
//                         <TableCell>{customer.code}</TableCell>
//                         <TableCell className="text-right">
//                             <Button
//                                 className="cursor-pointer"
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => handleView(customer)}
//                             >
//                                 View
//                             </Button>
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//                 <TableRow>
//                     <TableCell colSpan={6} className="p-4">
//                         <div className="flex justify-between items-center w-full">
//                             <span>Total: {customers.total}</span>
//                             <div>
//                                 <Pagination>
//                                     <PaginationContent>
//                                         <PaginationItem>
//                                             <PaginationPrevious
//                                                 className="cursor-pointer"
//                                                 onClick={() =>
//                                                     goToPage(
//                                                         customers.current_page -
//                                                             1,
//                                                     )
//                                                 }
//                                                 // disabled={
//                                                 //     customers.current_page === 1
//                                                 // }
//                                             />
//                                         </PaginationItem>

//                                         {getPages().map((page) => (
//                                             <PaginationItem key={page}>
//                                                 {page ===
//                                                 customers.current_page ? (
//                                                     <PaginationLink
//                                                         href="#"
//                                                         className="bg-gray-200"
//                                                     >
//                                                         {page}
//                                                     </PaginationLink>
//                                                 ) : (
//                                                     <PaginationLink
//                                                         href="#"
//                                                         onClick={() =>
//                                                             goToPage(page)
//                                                         }
//                                                     >
//                                                         {page}
//                                                     </PaginationLink>
//                                                 )}
//                                             </PaginationItem>
//                                         ))}

//                                         <PaginationItem>
//                                             <PaginationNext
//                                                 className="cursor-pointer"
//                                                 onClick={() =>
//                                                     goToPage(
//                                                         customers.current_page +
//                                                             1,
//                                                     )
//                                                 }
//                                                 // disabled={
//                                                 //     customers.current_page ===
//                                                 //     customers.last_page
//                                                 // }
//                                             />
//                                         </PaginationItem>
//                                     </PaginationContent>
//                                 </Pagination>
//                             </div>
//                         </div>
//                     </TableCell>
//                 </TableRow>
//             </TableFooter>
//         </Table>
//     );
// }

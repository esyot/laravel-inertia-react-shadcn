import Layout from "../layout";
import { users } from "../manage-user/data/users";
import SectionContent from "../components/section-content";
import { TransactionTable } from "./components/transactionHistoryTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Transaction() {
    const [showHistory, setShowHistory] = useState(true);

    return (
        <Layout>
            <SectionContent header={false}>
                <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold">Transaction Page</div>

                    {/* Simple tab buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant={showHistory ? "default" : "outline"}
                            onClick={() => setShowHistory(true)}
                        >
                            History
                        </Button>
                        <Button
                            variant={!showHistory ? "default" : "outline"}
                            onClick={() => setShowHistory(false)}
                        >
                            Customers
                        </Button>
                    </div>
                </div>

                {/* Pass toggle state to table */}
                <TransactionTable users={users} showHistory={showHistory} />
            </SectionContent>
        </Layout>
    );
}

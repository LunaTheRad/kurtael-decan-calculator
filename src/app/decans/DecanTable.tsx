import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/app/decans/DecanTableColumns";
import {Decan} from "@/app/data/definitions";

export const DecanTable = (data: { decans: Decan[] }) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data.decans}/>
        </div>
    );
};

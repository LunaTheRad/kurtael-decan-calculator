"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Decan} from "@/app/data/definitions";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Decan>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "keyword",
        header: "Keyword",
    },
    {
        accessorKey: "mana",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Mana
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "influence",
        header: "Influence",
    },
    {
        accessorKey: "places",
        header: "Places",
    },
    {
        accessorKey: "materials",
        header: "Materials",
    },
]

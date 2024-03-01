import {DecanLoader} from "@/app/decans/DecanLoader";
import {ModeToggle} from "@/components/ui/theme-toggle";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <ModeToggle></ModeToggle>

            <DecanLoader></DecanLoader>
        </main>
    );
}

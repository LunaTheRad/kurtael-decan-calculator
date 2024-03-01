import {promises as fs} from 'fs';
import {addDecanDetails, Decan} from "@/app/data/definitions";
import {DecanCalculator} from "@/app/decans/DecanCalculator";


export const DecanLoader = async () => {
    const file = await fs.readFile(process.cwd() + '/src/app/data/decans.json', 'utf8');
    const data: Decan[] = JSON.parse(file).map(addDecanDetails)


    return <DecanCalculator decans={data}></DecanCalculator>

}
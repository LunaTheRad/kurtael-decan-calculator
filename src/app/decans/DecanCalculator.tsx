'use client'

import {
    Coordinates,
    oneDay,
    oneHour,
    planetOrbitalCycles,
    speedMultiplier,
    startOfCampaign, timeDif, Decan, opposingPlanets, oneMinute
} from "@/app/data/definitions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {DecanTable} from "@/app/decans/DecanTable";
import {useState} from "react";

const formSchema = z.object({
    day: z.coerce.number().min(0).int(),
    hour: z.coerce.number().min(0).max(23).int(),
    minute: z.coerce.number().min(0).max(59).int()
})

export const DecanCalculator = (data: { decans: Decan[] }) => {

    const [decans, setDecans] = useState<Decan[]>(data.decans)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            day: 0,
            hour: 0,
            minute: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const d = calculate(values.day, values.hour, values.minute)
        setDecans([...d])
    }

    function calculate(day: number, hour: number, minute: number): Decan[] {
        const time = (startOfCampaign + (oneDay * day + oneHour * hour + minute * oneMinute) * speedMultiplier) / oneDay;
        const sunCurrent: Coordinates = getPlanetCoordinates(time, "Sun", {x: 0, y: 0, z: 0});
        const sunFuture: Coordinates = getPlanetCoordinates(time + timeDif, "Sun", {x: 0, y: 0, z: 0})

        data.decans.forEach((decan: Decan) => {
                decan.mana =
                    1
                    + getPlanetMana(decan.planet, time, sunCurrent, sunFuture)
                    - getPlanetMana(opposingPlanets[decan.planet], time, sunCurrent, sunFuture)
                    + getZodiacMana(decan.positionValue, sunCurrent);
            }
        )

        return data.decans
    }

    function getPlanetCoordinates(time: number, planet: string, sunCoordinates: Coordinates): Coordinates {
        return {
            x: .3 * Math.cos(time / planetOrbitalCycles[planet]) + sunCoordinates.x,
            y: .32 * Math.cos(time / (planetOrbitalCycles[planet] + .14 * Math.PI)) + sunCoordinates.y,
            z: .1 * Math.cos(time / (planetOrbitalCycles[planet] / 182.5)) + sunCoordinates.z
        }
    }

    function getPlanetMana(planet: string | null, time: number, sunCurrent: Coordinates, sunFuture: Coordinates) {
        if (planet == null) return 0
        const coordinatesCurrent: Coordinates = getPlanetCoordinates(time, planet, sunCurrent)
        const coordinatesFuture: Coordinates = getPlanetCoordinates(time + timeDif, planet, sunFuture)
        if (coordinatesCurrent.z < 0) return 0
        const direction = distance(coordinatesCurrent) - distance(coordinatesFuture)
        if (direction > 0) return -1
        else if (direction < 0) return 1
        else return 0
    }

    function getZodiacMana(position: number, sun: Coordinates) {
        const degrees: number = Math.atan(sun.y / sun.x) * 360 / (2 * Math.PI)
        const positionTen: number = Math.floor(degrees / 10)
        const positionThirty: number = Math.floor(degrees / 30)
        const positionOpposing: number = Math.floor(degrees + 18) % 36

        return 0 + (positionTen === position ? 1 : 0)
        + (positionThirty === Math.floor(position / 3) ? 1 : 0)
        - (positionTen === positionOpposing ? 1 : 0)
        - (positionThirty === Math.floor(positionOpposing / 3) ? 1 : 0)
    }

    function distance(coordinates: Coordinates): number {
        return Math.sqrt(coordinates.x ** 2 + coordinates.y ** 2 + coordinates.z ** 2)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="day"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Day</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Days since campaign start.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hour"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Hour</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The hour of the day.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minute"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Minute</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The minute within the hour.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
            <DecanTable decans={decans}></DecanTable>
        </>
    );
};

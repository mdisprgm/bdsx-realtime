import { location } from '../config.json';
import * as suncalc from 'suncalc';

const { latitude, longitude } = location

export namespace timeAdapter {
    let from: Date
    let to: Date
    let tickOffset: number
    let tickDuration: number
    export let lastTick: number

    export function timeAdapter(from_: Date, to_: Date, type: any) {
        from = from_
        to = to_
        tickOffset = type.offset
        tickDuration = type.period
    }

    export function getCurrentTick() {
        const from_ = from.getTime()
        const period = to.getTime() - from_
        const time = new Date().getTime()
        const current = time - from_
        const tick = tickDuration * current / period
        return tickOffset + tick;
    }

    export const type = {
        day: { offset: 22835, period: 14315 },
        night: { offset: 37150, period: 9685 }
    }

    export function updateTimeAdapter() {
        const date = new Date()
        const time = date.getTime()
        let sunrise = suncalc.getTimes(date, latitude, longitude).sunrise
        let sunset = suncalc.getTimes(date, latitude, longitude).sunset

        if (time < sunrise.getTime()) {
            date.setDate(date.getDate() - 1)
            sunset = suncalc.getTimes(date, latitude, longitude).sunset
            return timeAdapter(sunset, sunrise, type.night);
        }

        if (time < sunset.getTime()) return timeAdapter(sunrise, sunset, type.day);

        date.setDate(date.getDate() + 1)
        sunrise = suncalc.getTimes(date, latitude, longitude).sunrise
        timeAdapter(sunset, sunrise, type.night)
    }
}

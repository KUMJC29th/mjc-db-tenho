/* Copyright © 2020 matcher-ice
* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
* This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { toRegularDate } from "./DateExtensions";
import { getCurrentDanPoint, getLowerBoundDanPoint, getUpperBoundDanPoint } from '@/services/getDanPoint';

export function toShortDate(value: Date): string
{
    return toRegularDate(value).substr(2);
}

export function toInteger(value: number): string
{
    return value.toFixed(0);
}

export function toSignedInteger(value: number): string
{
    return value > 0 ? `+${value.toFixed(0)}` : value.toFixed(0);
}

export function toProbability(value: number): string
{
    return `${(value * 100).toFixed(2)}%`;
}

export function toDecimal(value: number): string
{
    return value.toFixed(3);
}

const danDisplay = ["初段", "二段", "三段", "四段", "五段", "六段", "七段", "八段", "九段", "十段", "天鳳"] as const;
export function toDan(value: number): string
{
    const { dan, point } = getCurrentDanPoint(value);
    return dan !== 10 ? `${danDisplay[dan]} ${point}/${getUpperBoundDanPoint(dan) - getLowerBoundDanPoint(dan)}`
        : "天鳳";
}

export function toDanOnly(value: number): string
{
    const { dan } = getCurrentDanPoint(value);
    return danDisplay[dan];
}

type NumericValueType = "integer" | "signedInteger" | "probability" | "decimal" | "dan";
export function getChartValueFormatter(type: NumericValueType): (value: number) => string
{
    switch (type)
    {
        case "integer": return toInteger;
        case "signedInteger": return toSignedInteger;
        case "probability": return toProbability;
        case "decimal": return toDecimal;
        case "dan": return toDan;
    }
}

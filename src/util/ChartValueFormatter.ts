/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { toRegularDate } from "./DateExtensions";

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

type NumericValueType = "integer" | "signedInteger" | "probability" | "decimal";
export function getNumericFormatter(type: NumericValueType): (value: number) => string
{
    switch (type)
    {
        case "integer": return toInteger;
        case "signedInteger": return toSignedInteger;
        case "probability": return toProbability;
        case "decimal": return toDecimal;
    }
}

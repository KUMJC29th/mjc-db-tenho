/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { toRegularDate } from "../util/DateExtensions";

type NumericValueType = "integer" | "signedInteger" | "probability" | "decimal";

export function toShortDate(params: { readonly value: Date | null }): string
{
    return toRegularDate(params.value).substr(2);
}

export function toInteger(params: { readonly value: number | null }): string
{
    return params.value?.toFixed(0) ?? "";
}

export function toSignedInteger(params: { readonly value: number | null }): string
{
    return params.value == null ? ""
        : params.value > 0 ? `+${params.value.toFixed(0)}` : params.value.toFixed(0);
}

export function toProbability(params: { readonly value: number | null }): string
{
    return params.value == null ? "" : `${(params.value * 100).toFixed(2)}%`;
}

export function toDecimal(params: { readonly value: number | null }): string
{
    return params.value?.toFixed(3) ?? "";
}

export function getNumericFormatter(type: NumericValueType): ((params: { readonly value: number | null }) => string)
{
    switch (type)
    {
        case "integer": return toInteger
        case "signedInteger": return toSignedInteger
        case "probability": return toProbability
        case "decimal": return toDecimal
    }
}
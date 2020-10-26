/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

export function dateNumToDate(dateNum: number): Date
{
    const y = Math.floor(dateNum / 10000) + 2000;
    const m = Math.floor(dateNum / 100) % 100;
    const d = dateNum % 100;
    return new Date(y, m - 1, d);
}

function padZero(n: number): string
{
    return ("00" + n).slice(-2);
}

export function toRegularDate(date: Date | null, paddingZero: boolean = true): string
{
    if (paddingZero)
    {
        return date == null ? ""
            : `${date.getFullYear()}/${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`;
    }
    else
    {
        return date == null ? ""
            : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}
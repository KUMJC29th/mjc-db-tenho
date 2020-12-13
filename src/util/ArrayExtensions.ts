/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

export function lowerBoundIndex<T extends number | string | Date>(array: readonly T[], value: T): number
{
    let l = 0;
    let r = array.length - 1;
    while (l <= r)
    {
        const m = l + Math.floor((r - l) / 2);
        if (array[m] < value)
        {
            l = m + 1;
        }
        else
        {
            r = m - 1;
        }
    }
    return l;
}

export function upperBoundIndex<T extends number | string | Date>(array: readonly T[], value: T): number
{
    let l = 0;
    let r = array.length - 1;
    while (l <= r)
    {
        const m = l + Math.floor((r - l) / 2);
        if (array[m] <= value)
        {
            l = m + 1;
        }
        else
        {
            r = m - 1;
        }
    }
    return l;
}

export function group<T, K>(array: readonly T[], keySelector: (item: T) => K): IterableIterator<readonly T[]>
{
    const map = new Map<K, T[]>();
    for (const item of array)
    {
        const key = keySelector(item);
        if (!map.has(key))
        {
            map.set(key, []);
        }
        map.get(key)!.push(item);
    }
    return map.values();
}

function nonNull<T>(item: T | null | undefined): item is T
{
    return item != null;
}

export function ofType<T>(array: readonly (T | null | undefined)[]): T[]
{
    return array.filter(nonNull);
}


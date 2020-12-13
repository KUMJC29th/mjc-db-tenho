export type DanPoint = {
    readonly dan: number;
    readonly point: number;
}

export function getUpperBoundDanPoint(dan: number): number
{
    return dan !== 10 ? 200 * (dan + 1) * (dan + 2) : getLowerBoundDanPoint(10);
}

export function getLowerBoundDanPoint(dan: number): number
{
    return 200 * dan * (dan + 1);
}

const upperBounds: readonly number[] = [...new Array(10)].map((_, i) => getUpperBoundDanPoint(i));
const lowerBounds: readonly number[] = [...new Array(10)].map((_, i) => getLowerBoundDanPoint(i));
const changes: readonly (readonly number[])[] = [... new Array(10)].map((_, dan) => [
    dan < 3 ? 60 : dan < 6 ? 75 : 90,
    dan < 3 ? 15 : dan < 6 ? 30 : 45,
    0,
    -15 * (dan + 3)
]);

export function getCurrentDanPoint(currentPoint: number): DanPoint
{
    for (let i = 0; i < upperBounds.length; ++i)
    {
        if (currentPoint < upperBounds[i])
        {
            return {
                dan: i,
                point: currentPoint - lowerBounds[i]
            };
        }
    }
    return {
        dan: 10,
        point: 0
    };
}

export function getNewDanPoint(currentPoint: number, rank: number): number
{
    const { dan } = getCurrentDanPoint(currentPoint);
    if (dan === 10)
    {
        return upperBounds[9];
    }
    const newPoint = currentPoint + changes[dan][rank];
    if (newPoint < 0)
    {
        // 初段は降段しない
        return 0;
    }
    else if (newPoint >= upperBounds[dan])
    {
        // 昇段
        return (lowerBounds[dan + 1] + upperBounds[dan + 1]) / 2;
    }
    else if (newPoint < lowerBounds[dan])
    {
        // 降段
        return (lowerBounds[dan - 1] + upperBounds[dan - 1]) / 2;
    }
    else
    {
        return newPoint;
    }
}
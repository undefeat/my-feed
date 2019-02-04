import calcListSelection, { ListSelectionArgs, getDirection, ScrollDirection } from '../calcListSelection';

export const args: ListSelectionArgs = {
    overscan: 7,
    rowCount: 11,
    scrollHeight: 17389,
    scrollTop: 6917,
    totalRows: 97
};

describe('calcListSelection', () => {
    it('should return certain selection when default test args', () => {
        expect(calcListSelection(args)).toEqual({ renderFrom: 32, renderTo: 57 });
    });

    it('should return empty selection when scrollHeight is negative or 0', () => {
        expect(
            calcListSelection({
                ...args,
                scrollHeight: -199
            })
        ).toEqual({
            renderFrom: 0,
            renderTo: 0
        });

        expect(
            calcListSelection({
                ...args,
                scrollHeight: 0
            })
        ).toEqual({
            renderFrom: 0,
            renderTo: 0
        });
    });

    it('should return empty selection when totalRows is negative or 0', () => {
        expect(
            calcListSelection({
                ...args,
                totalRows: -199
            })
        ).toEqual({
            renderFrom: 0,
            renderTo: 0
        });

        expect(
            calcListSelection({
                ...args,
                totalRows: 0
            })
        ).toEqual({
            renderFrom: 0,
            renderTo: 0
        });
    });

    it('should select from 0 when scrollTop is negative or 0', () => {
        expect(
            calcListSelection({
                ...args,
                scrollTop: -199
            }).renderFrom
        ).toBe(0);

        expect(
            calcListSelection({
                ...args,
                scrollTop: 0
            }).renderFrom
        ).toBe(0);
    });

    it('should select to totalRows when scrollTop is greater than scrollHeight', () => {
        expect(
            calcListSelection({
                ...args,
                scrollTop: 8663,
                scrollHeight: 4391
            }).renderTo
        ).toBe(args.totalRows);
    });

    it('should add overscan to rowCount when both are present', () => {
        const { renderFrom, renderTo } = calcListSelection(args);

        expect(renderFrom + 2 * args.overscan + args.rowCount).toBe(renderTo);
    });

    it('should treat negative overscan as 0', () => {
        expect(
            calcListSelection({
                ...args,
                overscan: -199
            })
        ).toEqual(
            calcListSelection({
                ...args,
                overscan: 0
            })
        );
    });

    it('should return empty selection when rrowCount is negative or 0', () => {
        expect(
            calcListSelection({
                ...args,
                rowCount: -199
            })
        ).toEqual(
            calcListSelection({
                ...args,
                rowCount: 0
            })
        );

        expect(
            calcListSelection({
                ...args,
                rowCount: 0
            })
        ).toEqual({
            renderFrom: 0,
            renderTo: 0
        });
    });
});

describe('getDirection', () => {
    it('should return UP when prevScrollTop is greater than scrollTop', () => {
        expect(getDirection(709, 383)).toBe(ScrollDirection.UP);
    });

    it('should return DOWN when prevScrollTop is equal or less than scrollTop', () => {
        expect(getDirection(709, 709)).toBe(ScrollDirection.DOWN);
        expect(getDirection(383, 709)).toBe(ScrollDirection.DOWN);
    });
});

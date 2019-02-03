function calcListSelection(args: ListSelectionArgs): ListSelection {
    let { overscan, rowsToShow, scrollHeight, scrollTop, totalRows } = args;

    if (scrollHeight <= 0 || totalRows <= 0 || rowsToShow <= 0) {
        return { renderFrom: 0, renderTo: 0 }; // Empty selection.
    }

    // Sanitize variables.
    overscan = Math.max(0, args.overscan),
    scrollTop = Math.min(scrollTop, scrollHeight),
    scrollHeight = Math.max(scrollHeight);

    const firstIndexMax = totalRows - rowsToShow,
        scrolledShare = scrollTop / scrollHeight,
        firstIndex = Math.min(scrolledShare * totalRows, firstIndexMax),
        lastIndex = firstIndex + rowsToShow,
        renderFrom = Math.max(0, firstIndex - overscan),
        renderTo = Math.min(totalRows, lastIndex + overscan);

    return {
        renderFrom: Math.round(renderFrom),
        renderTo: Math.round(renderTo)
    };
}

export function getDirection(prevScrollTop: number, scrollTop: number): ScrollDirection {
    const deltaY = scrollTop - prevScrollTop;
    return deltaY >= 0 ? ScrollDirection.DOWN : ScrollDirection.UP;
}

export const enum ScrollDirection {
    UP,
    DOWN
}

export interface ListSelection {
    /**
     * Index of the first row to render.
     */
    renderFrom: number;
    /**
     * Intex of the last row to render.
     */
    renderTo: number;
}

export interface ListSelectionArgs {
    /**
     * Number of rows to render before and after visible rows.
     */
    overscan: number;
    /**
     * Number of rows to render always.
     */
    rowsToShow: number;
    /**
     * Total height of the list.
     */
    scrollHeight: number;
    /**
     * Height of the postion of the list hidden above the viewport.
     */
    scrollTop: number;
    /**
     * Total number of rows.
     */
    totalRows: number;
}

export default calcListSelection;

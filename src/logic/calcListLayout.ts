function calcListLayout(prevLayout: ListLayout, options: ListLayoutOptions): ListLayout {
    const { containerHeight, scrollTop, prevScrollTop, scrollHeight, overscan, rowHeightMin, totalRows } = options;

    const rowsToShow = Math.round(containerHeight / rowHeightMin),
        scrolledShare = scrollTop / (scrollHeight || 1000);

    const firstIndex = Math.round(scrolledShare * totalRows),
        lastIndex = firstIndex + rowsToShow,
        renderFrom = Math.max(0, firstIndex - overscan),
        renderTo = Math.min(totalRows, lastIndex + overscan);

    const deltaY = scrollTop - prevScrollTop,
        direction = deltaY > 0 ? ScrollDirection.DOWN : ScrollDirection.UP;

    if (prevLayout.direction === direction) {
        return {
            renderFrom,
            renderTo,
            direction
        };
    }

    return {
        renderFrom: prevLayout.renderFrom,
        renderTo: prevLayout.renderTo,
        direction
    };
}

export const enum ScrollDirection {
    UP,
    DOWN
}

export interface ListLayout {
    renderFrom: number;
    renderTo: number;
    direction: ScrollDirection;
}

export interface ListLayoutOptions {
    containerHeight: number;
    prevScrollTop: number;
    scrollTop: number;
    scrollHeight: number;
    overscan: number;
    totalRows: number;
    rowHeightMin: number;
}

export default calcListLayout;

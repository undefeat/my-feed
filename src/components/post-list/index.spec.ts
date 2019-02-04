import * as React from 'react';
import PostList from '.';
import { ScrollDirection } from '../../logic/calcListSelection';
import { args } from '../../logic/calcListSelection.spec';

function mockPostList(props?: any) {
    const postList = new PostList({ postInfos: [], rowCount: 11, overscan: 7, ...props });
    postList.containerRef = React.createRef();
    postList.listRef = React.createRef();
    postList.setState = jest.fn();

    return postList;
}

describe('recalculateSelection', () => {
    it('should update state when either container or list are null', () => {
        const postList = mockPostList();

        postList.recalculateSelection();

        expect(postList.setState).not.toHaveBeenCalled();
    });
});

describe('calcNextState', () => {
    it('should call onScrollTopChanged', () => {
        const onScrollTopChanged = jest.fn(),
            postList = mockPostList({ onScrollTopChanged }),
            prevScrollTop = 199,
            scrollTop = 211;

        postList.calcNextState(
            { ...postList.state, scrollTop: prevScrollTop },
            { scrollTop: prevScrollTop } as any,
            6917,
            onScrollTopChanged
        );
        expect(onScrollTopChanged).not.toHaveBeenCalled();

        postList.calcNextState(
            { ...postList.state, scrollTop: prevScrollTop },
            { scrollTop: scrollTop } as any,
            6917,
            onScrollTopChanged
        );
        expect(onScrollTopChanged).toBeCalledWith(scrollTop);
    });

    it('should return previous selection when direction changes', () => {
        const postList = mockPostList(),
            prevState = { renderFrom: 59, renderTo: 73, scrollTop: 211, direction: ScrollDirection.DOWN },
            newScrollTop = 199;

        const nextState = postList.calcNextState(
            { ...postList.state, ...prevState },
            { ...args, scrollTop: newScrollTop },
            6917
        );

        expect(nextState.renderFrom).toBe(prevState.renderFrom);
        expect(nextState.renderTo).toBe(prevState.renderTo);
    });

    it('should return new selection when direction does not change', () => {
        const postList = mockPostList(),
            prevState = { renderFrom: 59, renderTo: 73, scrollTop: 199, direction: ScrollDirection.DOWN },
            newScrollTop = 201;

        const nextState = postList.calcNextState(
            { ...postList.state, ...prevState },
            { ...args, scrollTop: newScrollTop },
            6917
        );

        expect(nextState.renderFrom).not.toBe(prevState.renderFrom);
        expect(nextState.renderTo).not.toBe(prevState.renderTo);
    });
});
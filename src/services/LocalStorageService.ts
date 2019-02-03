import { throttle } from 'lodash';

class LocalStorageService {
    readScrollTop(): number {
        const scrollTop = Number(localStorage.getItem(this.scrollTopKey));

        if (Number.isNaN(scrollTop)) {
            return 0;
        }

        return scrollTop;
    }

    writeScrollTopThrottled = throttle(this.writeScrollTop, 200);

    private writeScrollTop(scrollTop: number) {
        localStorage.setItem(this.scrollTopKey, String(scrollTop));
    }

    private scrollTopKey = 'scrollTop';
}

export default new LocalStorageService();

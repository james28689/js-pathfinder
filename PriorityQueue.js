class PriorityQueue {
    #heap;
    #comparator;

    constructor(comparator = (a, b) => a > b) {
        this.#heap = [];
        this.#comparator = comparator;
    }

    get size() {
        return this.#heap.length;
    }

    get isEmpty() {
        return this.size === 0;
    }

    peek() {
        return this.#heap[top];
    }

    push(...values) {
        values.forEach(value => {
            this.#heap.push(value);
            this.#siftUp();
        });
        return this.size;
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size - 1;
        if (bottom > top) {
            this.#swap(top, bottom);
        }
        this.#heap.pop();
        this.#siftDown();
    }
}
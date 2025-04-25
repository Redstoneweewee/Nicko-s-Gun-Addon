//Implement a max heap in Javascript
//Written by Zeeshan Ahmad (https://gist.github.com/zeeshan1112) and modified by Warden

/**
 * @template T
 * @template {number} P
 * @typedef {object} PriorityItem
 * @property {T} item
 * @property {P} priority
 */

/**
 * Generic MaxHeap that only accepts items with a `priority` number.
 * @template T
 */
class MaxHeap {
    /** @type {PriorityItem<T, number>[]} */
    heap;

    /**
     * @param {PriorityItem<T, number>[]} [arr]
     */
    constructor(arr) {
        this.heap = arr ?? [];
        for (let i = this.heap.length - 1; i >= 0; i--) {
            this.#maxHeapify(i);
        }
    }

    /**
     * @param {PriorityItem<T, number>} val
     */
    insert(val) {
        this.heap.push(val);
        this.#bubbleUp(this.heap.length - 1);
    }

    getMax() {
        return this.heap.length ? this.heap[0] : null;
    }

    removeMax() {
        if (this.heap.length > 1) {
            const max = this.heap[0];
            const last = this.heap.pop();
            if (last) this.heap[0] = last;
            this.#maxHeapify(0);
            return max;
        } else if (this.heap.length === 1) {
            return this.heap.pop();
        }
        return null;
    }

    #maxHeapify(index) {
        while (true) {
            let left = index * 2 + 1;
            let right = left + 1;
            let largest = index;
            if (left < this.heap.length && this.heap[largest].priority < this.heap[left].priority) largest = left;
            if (right < this.heap.length && this.heap[largest].priority < this.heap[right].priority) largest = right;
            if (largest !== index) {
                [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
                index = largest;
            } else break;
        }
    }

    #bubbleUp(index) {
        const element = this.heap[index];
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIdx];
            if (parent.priority < element.priority) {
                this.heap[index] = parent;
                this.heap[parentIdx] = element;
                index = parentIdx;
            } else break;
        }
    }
}


export { MaxHeap };

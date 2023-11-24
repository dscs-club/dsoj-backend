export class Queue<T> {
    _store: T[] = [];
    push(value: T) {
        this._store.push(value);
    }
    pop(): T | undefined {
        return this._store.shift();
    }
}
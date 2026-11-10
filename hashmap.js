class Node {
    constructor(val, nxt) {
        this.value = val;
        this.nextNode = nxt;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node(null, null);
        this.len = 0;
    }
    append(value) {
        let cur = this.head;
        while (cur.nextNode != null) {
            cur = cur.nextNode;
        }
        let newNode = new Node(value, cur.nextNode);
        cur.nextNode = newNode;
        this.len++;
    }
    prepend(value) {
        let newNode = new Node(value, this.head.nextNode);
        this.head.nextNode = newNode;
        this.len++;
    }
    size() {
        return this.len;
    }
    head() {
        let cur = this.head.nextNode;
        if (cur === null) {
            return undefined;
        } else {
            return cur.value;
        }
    }
    tail() {
        let cur = this.head;
        while (cur.nextNode != null) {
            cur = cur.nextNode;
        }
        if (cur === head) {
            cur = cur.nextNode;
        } else {
            return cur.value;
        }
    }
    at(index) {
        let cur = head;
        for (let i = 0; i < index; i++) {
            cur = cur.nextNode;
            if (cur === null) {
                break;
            }
        }
        if (pos === cur) {
            return undefined;
        } else {
            return cur.value;
        }
    }
    pop() {
        let cur = this.head.nextNode;
        if (cur === null) {
            return undefined;
        }
        this.head.nextNode = cur.nextNode;
        this.len--;
        return cur.value;
    }
    contains(value) {
        let cur = this.head.nextNode;
        while (cur != null) {
            if (cur.value === value) {
                return true;
            }
            cur = cur.nextNode;
        }
        return false;
    }
    findIndex(value) {
        let cur = this.head.nextNode, idx = 0;
        while (cur != null) {
            if (cur.value === value) {
                return idx;
            }
            cur = cur.nextNode;
            idx++;
        }
        return -1;
    }
    insertAt(index, ...values) {
        if (index < 0 || this.size() < index) {
            throw new RangeError();
        }
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.nextNode;
        }
        for (const value of values) {
            let newNode = new Node(value, cur.nextNode);
            cur.nextNode = newNode;
            cur = newNode;
            this.len++;
        }
    }
    removeAt(index) {
        if (index < 0 || this.size() <= index) {
            throw new RangeError();
        }
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.nextNode;
        }
        cur.nextNode = cur.nextNode.nextNode;
        this.len--;

    }
    toString() {
        let str = "", cur = this.head.nextNode;
        while (cur != null) {
            str += "( ";
            str += String(cur.value);
            str += " ) -> ";
            cur = cur.nextNode;
        }
        str += "null";
        return str;
    }
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.bucket = [];
        for (let i = 0; i < this.capacity; i++) {
            this.bucket[i] = new LinkedList();
        }
    }
    hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    set(key, value) {
        const hashCode = this.hash(key) % this.capacity;
        let cur = this.bucket[hashCode].head;
        while (cur != null) {
            if (cur.value?.key === key) {
                cur.value.value = value;
                return;
            }
            cur = cur.nextNode;
        }
        this.bucket[hashCode].append({ key: key, value: value });
        if (this.bucket[hashCode].contains(key)) {
            this.bucket[hashCode].removeAt(this.bucket[hashCode].findIndex(key));
        }
        if (this.length() > this.loadFactor * this.capacity) {
            const entries = this.entries();
            for (let i = 0; i < this.capacity; i++) {
                while (this.bucket[i].size() >= 1) {
                    this.bucket[i].pop();
                }
            }
            for (let i = this.capacity; i < this.capacity * 2; i++) {
                this.bucket[i] = new LinkedList();
            }
            this.capacity *= 2;
            for (let i = 0; i < entries.length; i++) {
                const hashCode = this.hash(entries[i][0]);
                this.bucket[hashCode].append({ key: entries[i][0], value: entries[i][1] });
            }
        }
    }
    get(key) {
        const hashCode = this.hash(key);
        let cur = this.bucket[hashCode].head;
        while (cur != null) {
            if (cur.value?.key === key) {
                return cur.value.value;
            }
            cur = cur.nextNode;
        }
        return undefined;
    }
    has(key) {
        return this.get(key) != undefined;
    }
    remove(key) {
        if (!this.has(key)) {
            return false;
        }
        const hashCode = this.hash(key);
        let cur = this.bucket[hashCode].head.nextNode;
        for (let i = 0; i < this.bucket[hashCode].size(); i++) {
            if (cur.value.key === key) {
                this.bucket[hashCode].removeAt(i);
                break;
            }
            cur = cur.nextNode;
        }
        return true;
    }
    length() {
        let len = 0;
        for (let i = 0; i < this.capacity; i++) {
            len += this.bucket[i].size();
        }
        return len;
    }
    keys() {
        let res = [];
        for (let i = 0; i < this.capacity; i++) {
            let cur = this.bucket[i].head.nextNode;
            while (cur != null) {
                res.push(cur.value.key);
                cur = cur.nextNode;
            }
        }
        return res;
    }
    values() {
        let res = [];
        for (let i = 0; i < this.capacity; i++) {
            let cur = this.bucket[i].head.nextNode;
            while (cur != null) {
                res.push(cur.value.value);
                cur = cur.nextNode;
            }
        }
        return res;
    }
    entries() {
        const keys = this.keys();
        const vals = this.values();
        const res = [];
        for (let i = 0; i < keys.length; i++) {
            res[i] = [keys[i], vals[i]];
        }
        return res;
    }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.entries());
console.log(test.hash("grape"));
console.log(test.hash("lion"));
const keys = test.keys();
for (key of keys) {
    console.log(test.hash(key));
}
console.log(test.keys());
console.log(test.values());
console.log(test.hash("grape"));
console.log(test.hash("dog"));
for (let i = 0; i < 16; i++) {
    console.dir(test.bucket[i], { depth: null });
}
test.set("moon", "silver");
console.log(test);
// const hm = new HashMap();
// console.log(hm);

// console.log(hash("Rama") % 16);
// console.log(hash("Sita") % 16);

// hm.set("Rama", "Rana");
// hm.set("Sita", "Ue");

// console.log(hm);

// console.log(hm.bucket[3].toString());

// console.log(hm.get("Rama"));
// console.log(hm.get("Sita"));
// console.log(hm.get("Mario"));


// hm.set("Rama", "bbb");
// hm.set("Sita", "aaa");
// hm.set("Mario", "Luigi");

// console.log(hm.get("Rama"));
// console.log(hm.get("Sita"));
// console.log(hm.get("Mario"));
// console.log(hm);
// console.log(hm.bucket[3].toString());
// console.log(hm.has("Alice"));
// console.log(hm.has("Mario"));
// hm.remove("Rama");
// console.log(hm.bucket[3].toString());
// hm.remove("Sita");
// console.log(hm.bucket[3].toString());
// console.log(hm.has("Rama"));
// console.log(hm.has("Sita"));
// console.log(hm.length());

// console.log(hm.entries());
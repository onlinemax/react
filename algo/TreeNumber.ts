export function getPrimeTo(num: number): number[] {
    if (num % 1 != 0) {
        throw `${num} is not an integer`
    }
    let primes: number[] = [1];
    for (let i: number = 2; i <= num; i++) {
        let isPrime = true;
        for (let j = 1; j < primes.length; j++) {
            if (i % primes[j] == 0) {
                isPrime = false;
                break;
            }
        }
        if (!isPrime)
            continue;
        primes.push(i);
    }
    return primes;
}
export function getTreeOfNumber(num: number): [number, number][] {
    if (!Number.isInteger(num)) {
        throw `${num} is not an integer`;
    }
    const primes: number[] = getPrimeTo(Math.ceil(Math.sqrt(num)));
    const tree: [number, number][] = [];
    for (let i = 1; i < primes.length; i++) {
        const prime = primes[i];
        if (num % prime != 0)
            continue;
        tree.push([prime, 1]);
        num /= prime;
        const index = tree.length - 1;
        while (num % prime == 0) {
            num /= prime;
            tree[index][1]++;
        }
        if (num == 1)
            break;
    }
    if (num != 1)
        tree.push([num, 1]);
    return tree;
}
export function TreeRepresentationString(num: number): string{
  const tree = getTreeOfNumber(num);
  const len: number = tree.length - 1;
  return tree.reduce(function (accum, val, index): string {
      return accum += `${val[0]}^${val[1]}${index != len ? " * ":""}`;
  }, `${num} = `));
}

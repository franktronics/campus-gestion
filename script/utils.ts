
export function rounder (n: number): number{
    const a = Math.round(n)
    if(a >= n) {
        return a
    }else{
        return a + 1
    }
}
export function classes(...args: string[]): string {
    return args.filter(x => x).join(" ");
}
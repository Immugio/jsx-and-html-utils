export function findParentWithAttribute(current: HTMLElement, attr: string, steps = 5): HTMLElement {
    if (current?.hasAttribute(attr)) {
        return current;
    }

    if (current && steps > 0) {
        steps--;
        return findParentWithAttribute(current.parentElement, attr, steps);
    }

    return null;
}
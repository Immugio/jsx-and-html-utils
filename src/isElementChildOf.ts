export function isElementChildOf(element: Element, ancestorToFind: Element): boolean {
    if (element === ancestorToFind) {
        return true;
    }

    if (element.parentElement) {
        return isElementChildOf(element.parentElement, ancestorToFind);
    }

    return false;
}
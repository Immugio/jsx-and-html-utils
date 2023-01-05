export function clearChildren(element: Node): void {
    while (element.firstChild) element.removeChild(element.lastChild);
}
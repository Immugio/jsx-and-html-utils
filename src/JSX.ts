/**
 * A helper function that ensures we won't work with null values
 */
function nonNull(val, fallback) {
    return val ? val : fallback;
}

/**
 * How do we handle children. Children can either be:
 * 1. Calls to DOM.createElement, returns a Node
 * 2. Text content, returns a Text
 * Both can be appended to other nodes.
 */
function domChildren(children) {
    return children.map(child => {
        if (typeof child === "string" || typeof child === "number") {
            return document.createTextNode(child.toString());
        }
        return child;
    });
}

/**
 * Allows the { condition && <element /> syntax }
 */
function appendChild(el: HTMLElement, c: any) {
    if (c !== false) {
        el.appendChild(c);
    }
}

/**
 * How do we handle regular nodes.
 * 1. We create an element
 * 2. We apply all properties from JSX to this DOM node
 * 3. If available, we append all children.
 */
function domNode(element, properties, children) {
    const el = document.createElement(element);

    Object.keys(nonNull(properties, {})).forEach(key => {
        if (typeof properties[key] === "object") {
            if (el[key] === undefined) {
                el[key] = {};
            }
            Object.keys(properties[key]).forEach(sub => {
                el[key][sub] = properties[key][sub];
            });

        } else {
            el[key] = properties[key];
        }
    });

    domChildren(children).forEach(child => {
        if (Array.isArray(child)) {
            child.forEach(c => appendChild(el, c));
        } else {
            appendChild(el, child);
        }
    });

    if (properties && typeof properties.ref === "function") {
        properties.ref(el);
    }

    return el;
}

/**
 * Entry function.
 * 1. Is the element a function, then it's a functional component.
 *    We call this function (pass props and children of course)
 *    and return the result. We expect a return value of type Node
 * 2. If the element is a string, we parse a regular node
 */
export function dom(element: string | JsxFunction, properties: JsxProps, ...children: (string | HTMLElement)[]): HTMLElement {
    children = children.filter(child => child !== undefined).flat();
    if (typeof element === "function") {
        return element({
            ...nonNull(properties, {}),
            children
        });
    }
    return domNode(element, properties, children);
}

export interface IRef<T = HTMLElement> {
    ref?: (e: T) => void;
}

export interface BaseProps {
    style?: Partial<CSSStyleDeclaration>;
    className?: string;
}

export interface JsxProps extends IRef, BaseProps {
    children?: AnyContent;
    [key: string]: any;
}

export type JsxFunction = (props: JsxProps) => HTMLElement;

export type AnyContent = HTMLElement | string;
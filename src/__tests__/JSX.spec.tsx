import { dom } from "../JSX";

describe("JSX", () => {
    it("should create a form element with noValidate attribute", () => {
        const form: HTMLFormElement = <form noValidate></form>;
        expect(form).not.toBeNull();
        expect(form.noValidate).toBeTruthy();
    });
});
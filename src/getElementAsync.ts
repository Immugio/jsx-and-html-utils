export async function getElementAsync(id: string): Promise<HTMLElement> {
    let el = document.getElementById(id);

    return new Promise<HTMLElement>(resolve => {

        const wait = () => {
            setTimeout(() => {
                el = document.getElementById(id);
                if (el) {
                    resolve(el);
                } else {
                    wait();
                }
            }, 1000);
        };

        if (el) {
            resolve(el);
        } else {
            wait();
        }
    });
}

export let baseUrl = "http://localhost:8080";

export function setBaseUrl(domain : string, port : string) {
    domain = domain.trim();
    port = port.trim();
    if(domain.length > 0) {
        baseUrl = 'http://' + domain + (port.length > 0 ? ':' + port : '');
    }
}

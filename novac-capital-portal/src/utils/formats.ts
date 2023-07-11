export function formatAmount(amount: string) {
    let formattedValue = amount.replace(/[^\d.]/g, "");
    formattedValue = formattedValue.match(/\d+(\.\d{0,2})?/)?.[0] ?? "";
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
}
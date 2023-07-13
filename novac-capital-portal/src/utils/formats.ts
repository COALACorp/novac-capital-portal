export function formatAmount(amount: number|string) {
    const strAmount = typeof amount === "number"
        ? amount % 1 === 0
            ? amount.toString()
            : amount.toFixed(2)
        : amount;
    let formattedValue = strAmount.replace(/[^\d.]/g, "");
    formattedValue = formattedValue.match(/\d+(\.\d{0,2})?/)?.[0] ?? "";
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
}
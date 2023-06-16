const calcs = {
    addIVA: (amount: number, iva: number) => (amount * iva),
    removeIVA: (amount: number, iva: number) => (amount / iva),
    totalRent: (taxedEquipment: number, advancePercentage: number, margin: number) => (taxedEquipment * (1 - (advancePercentage / 100)) * margin),
    taxedPartialities: (totalRent: number, months: number) => (totalRent / months),
    firstLastPartialities: (taxedPartialities: number) => (taxedPartialities * 2),
    advancePayment: (taxedEquipment: number, advancePercentage: number) => (taxedEquipment * (advancePercentage / 100)),
    totalInitialExpense: (firstLastPartiality: number, advancePayment: number, administrativeExpenses: number) => (firstLastPartiality + advancePayment + administrativeExpenses),
};

export default calcs;
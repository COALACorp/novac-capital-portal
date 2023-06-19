const addIVA = (amount: number, iva: number) => Number((amount * iva).toFixed(2));

const calcs = {
    addIVA,
    removeIVA: (amount: number, iva: number) => Number((amount / iva).toFixed(2)),
    totalRent: (taxedEquipment: number, advancePercentage: number, margin: number) => Number((taxedEquipment * (1 - (advancePercentage / 100)) * margin).toFixed(2)),
    taxedPartialities: (totalRent: number, months: number) => Number((totalRent / months).toFixed(2)),
    firstLastPartialities: (taxedPartialities: number) => Number((taxedPartialities * 2).toFixed(2)),
    administrativeExpenses: (administrativeExpenses: number, folioVerification: number, creditBureau: number, iva: number) => Number((addIVA(administrativeExpenses, iva) + addIVA(folioVerification, iva) + addIVA(creditBureau, iva)).toFixed(2)),
    advancePayment: (taxedEquipment: number, advancePercentage: number) => Number((taxedEquipment * (advancePercentage / 100)).toFixed(2)),
    totalInitialExpense: (firstLastPartiality: number, advancePayment: number, administrativeExpenses: number) => Number((firstLastPartiality + advancePayment + administrativeExpenses).toFixed(2)),
};

export default calcs;
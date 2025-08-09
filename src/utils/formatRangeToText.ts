

export function formatRangeToText(value : string ): string {
    switch (value) {
        case "1D":
        return "1 dia";
        case "5D":
        return "5 dias";
        case "1MO":
        return "1 mês";
        case "3MO":
        return "3 meses";
        default:
        return value;
    }
}
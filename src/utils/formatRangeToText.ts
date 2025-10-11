

export function formatRangeToText(value : string ): string {
    switch (value) {
        case "2D":
        return "2 dias";
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
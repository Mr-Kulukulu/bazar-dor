export const toBanglaNumber = (value: number | string) => {
    return value
        .toString()
        .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};
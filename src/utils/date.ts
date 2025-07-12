/**
 * return 'Samedi 07 nov 2020 à 12:08:08'
 * @param dateParam
 */
export const formatLikeDayMonthYearHour = (dateParam: string | Date): string => {
    // S’assurer d’avoir un Date
    const date = dateParam instanceof Date
        ? dateParam
        : new Date(dateParam);

    //if (isNaN(date.getTime())) { throw Error("Invalid date format")}

    // Options
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return date.toLocaleDateString('fr-FR', options).toString();
}
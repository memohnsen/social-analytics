import { format, parse } from 'date-fns';

export const formatDate = (date: string): string => {
    const formatString = "yyyy-MM-dd"
    const baseDate = new Date()

    const dateObject = parse(date, formatString, baseDate)

    const formattedOutput = format(dateObject, 'MMM dd, yyyy')
    return formattedOutput
}
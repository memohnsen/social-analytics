export const getStatusColors = (status: string): string => {
    switch (status) {
        case 'posted':
            return 'green'
        case 'idea':
            return '#ff84e8'
        case 'scheduled':
            return '#7f2ccb'
        case 'draft':
            return '#414361'
        case 'ad':
            return '#2a2d43'
        default: 
            return '#ffa9e7'
    }
}

export const getTypeColors = (type: string): string => {
    switch (type) {
        case 'reel':
            return 'green'
        case 'carousel':
            return '#ff84e8'
        case 'picture':
            return '#7f2ccb'
        case 'trial reel':
            return '#414361'
        case 'ad':
            return '#2a2d43'
        default: 
            return '#ffa9e7'
    }
}
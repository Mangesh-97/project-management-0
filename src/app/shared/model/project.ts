
export interface Iproject {
    projectTheme: string
    reason: string
    type: string
    division: string
    category: string
    priority: string
    department: string
    startDate: string
    endDate: string
    location: string
    status: IprojectStatus
    id?: string
}


export enum IprojectStatus {
    registred = 'Registred',
    running = 'Running',
    closed = 'Closed',
    cancelled = 'Cancelled'
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

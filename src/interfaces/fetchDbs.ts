export interface Results {
    databases: Databases[]
    totalSize: number
    totalSizeMb: number
    ok: number
}

export interface Databases {
    name: string
    sizeOnDisk: number
    empty: boolean
}

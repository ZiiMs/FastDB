import { Databases } from './fetchDbs'

export interface ConnectionInfo {
    address: string
    port: number
    name: string
    username?: string
    password?: string
    databases?: Databases[] | null
}

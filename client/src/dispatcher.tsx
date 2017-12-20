import { Dispatcher } from "flux";

export interface IDispatcherPayload {
    type: string;
    [others: string]: any;
}

export default new Dispatcher<IDispatcherPayload>();

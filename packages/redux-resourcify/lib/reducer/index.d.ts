import { RegisterResourceAction, UnregisterResourceAction } from '../actions';
declare type ActionTypes = RegisterResourceAction | UnregisterResourceAction | {
    type: 'OTHER_ACTION';
    payload?: any;
    meta?: {
        resource?: string;
    };
};
declare const _default: (previousState: {} | undefined, action: ActionTypes) => {};
export default _default;

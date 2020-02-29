import { Reducer } from 'redux';
import {
    CRUD_GET_MATCHING_SUCCESS,
    CrudGetMatchingSuccessAction,
    CRUD_GET_MATCHING_FAILURE,
    CrudGetMatchingFailureAction,
} from '../../../actions/dataActions';
import { Identifier } from '../../../types';

const initialState = {};

export interface PossibleValuesState {
    [relatedTo: string]: { error?: string | object } | Identifier[];
}

type ActionTypes =
    | CrudGetMatchingSuccessAction
    | CrudGetMatchingFailureAction
    | { type: 'OTHER_ACTION' };

const possibleValuesreducer: Reducer<PossibleValuesState> = (
    previousState = initialState,
    action: ActionTypes
) => {
    switch (action.type) {
        case CRUD_GET_MATCHING_SUCCESS:
            return {
                ...previousState,
                [action.meta.relatedTo]: action.payload.data.map(
                    record => record.id
                ),
            };
        case CRUD_GET_MATCHING_FAILURE:
            return {
                ...previousState,
                [action.meta.relatedTo]: { error: action.error },
            };
        default:
            return previousState;
    }
};

// @ts-ignore
export const getPossibleReferenceValues = (state, props) => {
    return state[props.referenceSource(props.resource, props.source)];
};

export const getPossibleReferences = (
    // @ts-ignore
    referenceState,
    // @ts-ignore
    possibleValues,
    selectedIds = []
) => {
    if (!possibleValues) {
        return null;
    }

    if (possibleValues.error) {
        return possibleValues;
    }
    possibleValues = Array.from(possibleValues);
    selectedIds.forEach(
        id =>
          // @ts-ignore
            possibleValues.some(value => value === id) ||
            possibleValues.unshift(id)
    );
    return possibleValues
      // @ts-ignore
      .map(id => referenceState.data[id])
      // @ts-ignore
      .filter(r => typeof r !== 'undefined');
};

export default possibleValuesreducer;

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as VesselActions from './vessel.actions';
import { Vessel } from '../../models/vessel.models';

export const VESSEL_FEATURE_KEY = 'vessel';

export interface VesselState extends EntityState<Vessel> {
  selectedId?: string | number; // which Vessel record has been selected
  loaded: boolean; // has the Vessel list been loaded
  loading: boolean;
  error?: string | null; // last known error (if any)
}

export interface VesselPartialState {
  readonly [VESSEL_FEATURE_KEY]: VesselState;
}

export const vesselAdapter: EntityAdapter<Vessel> =
  createEntityAdapter<Vessel>();

export const initialVesselState: VesselState = vesselAdapter.getInitialState({
  // set initial required properties
  loading: false,
  loaded: false
});

const reducer = createReducer(
  initialVesselState,
  on(VesselActions.loadVessel, (state) => ( {
    ...state,
    loaded: false,
    loading: true,
    error: null
  } )),
  on(VesselActions.loadVesselSuccess, (state, { vessels }) =>
    vesselAdapter.setAll(vessels, {
      ...state,
      loading: false,
      loaded: true
    })
  ),
  on(VesselActions.loadVesselFailure, (state, { error }) => ( {
    ...state,
    loading: false,
    error
  } ))
);

export function vesselReducer(state: VesselState | undefined, action: Action) {
  return reducer(state, action);
}

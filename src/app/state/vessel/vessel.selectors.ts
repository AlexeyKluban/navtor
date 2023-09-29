import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  VESSEL_FEATURE_KEY,
  VesselState,
  vesselAdapter,
} from './vessel.reducer';

// Lookup the 'Vessel' feature state managed by NgRx
export const selectVesselState =
  createFeatureSelector<VesselState>(VESSEL_FEATURE_KEY);

const { selectAll, selectEntities } = vesselAdapter.getSelectors();

export const selectVesselLoaded = createSelector(
  selectVesselState,
  (state: VesselState) => state.loaded
);

export const selectVesselError = createSelector(
  selectVesselState,
  (state: VesselState) => state.error
);

export const selectAllVessel = createSelector(
  selectVesselState,
  (state: VesselState) => selectAll(state)
);

export const selectVesselEntities = createSelector(
  selectVesselState,
  (state: VesselState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectVesselState,
  (state: VesselState) => state.selectedId
);

export const selectEntity = createSelector(
  selectVesselEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

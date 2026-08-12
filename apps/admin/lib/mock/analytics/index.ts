import { G1 } from './g1';
import { G2 } from './g2';
import { G3 } from './g3';
import { G4 } from './g4';
import { G5 } from './g5';
import { G6 } from './g6';
import { G7 } from './g7';
import { G8 } from './g8';

export * from './types';

export const GTABS = { G1, G2, G3, G4, G5, G6, G7, G8 };

export type GTabId = keyof typeof GTABS;

export const G_TAB_IDS = Object.keys(GTABS) as GTabId[];
